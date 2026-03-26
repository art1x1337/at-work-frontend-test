import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { fetchUsers } from '../api/users';
import { Loader } from '../components/Loader';
import { SuccessModal } from '../components/SuccessModal';
import { useUsersStore } from '../store/usersStore';
import type { EditableUserFields } from '../types/user';

const userSchema = z.object({
  name: z.string().trim().min(2, 'Имя должно содержать от 2 символов').max(64, 'Максимум 64 символа'),
  username: z
    .string()
    .trim()
    .min(2, 'Никнейм должен содержать от 2 символов')
    .max(64, 'Максимум 64 символа'),
  email: z.string().trim().email('Введите корректный email'),
  city: z.string().trim().min(2, 'Город должен содержать от 2 символов').max(64, 'Максимум 64 символа'),
  phone: z
    .string()
    .transform((value) => value.replace(/\D+/g, ''))
    .refine((value) => /^\d+$/.test(value), 'Телефон должен содержать только цифры')
    .refine((value) => value.length >= 5, 'Введите корректный телефон'),
  companyName: z
    .string()
    .trim()
    .min(2, 'Название компании должно содержать от 2 символов')
    .max(64, 'Максимум 64 символа'),
});

type UserFormValues = z.input<typeof userSchema>;
type UserPayload = z.output<typeof userSchema>;

const sanitizePhoneInput = (value: string) => value.replace(/\D+/g, '');

export const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const updateUser = useUsersStore((state) => state.updateUser);
  const getMergedUser = useUsersStore((state) => state.getMergedUser);

  const user = useMemo(() => {
    const found = data?.find((item) => String(item.id) === id);
    return found ? getMergedUser(found) : undefined;
  }, [data, getMergedUser, id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      city: '',
      phone: '',
      companyName: '',
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.city,
      phone: user.phone,
      companyName: user.companyName,
    });
  }, [reset, user]);

  const onSubmit = async (values: UserFormValues) => {
    const payload = userSchema.parse(values) as UserPayload;
    updateUser(Number(id), payload as EditableUserFields);
    setModalOpen(true);
  };

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Вернуться к списку
      </Link>

      <header className="page__topbar">
        <div className="page__headline">
          <h1>Редактирование пользователя</h1>
          <p>Форма построена на React Hook Form + Zod. Изменения хранятся только в рамках текущей сессии.</p>
        </div>
        <button type="button" className="btn btn--secondary" onClick={() => navigate(-1)}>
          Назад
        </button>
      </header>

      {isLoading && <Loader label="Загружаем пользователя..." />}
      {isError && <div className="empty-state">{error instanceof Error ? error.message : 'Ошибка загрузки.'}</div>}
      {!isLoading && !isError && !user && <div className="empty-state">Пользователь не найден.</div>}

      {!isLoading && !isError && user && (
        <div className="edit-layout">
          <form className="card-surface" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              <div className="form-field form-field--full">
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name')} />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="username">Username</label>
                <input id="username" {...register('username')} />
                {errors.username && <span className="form-error">{errors.username.message}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email')} />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="city">City</label>
                <input id="city" {...register('city')} />
                {errors.city && <span className="form-error">{errors.city.message}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  inputMode="numeric"
                  {...register('phone')}
                  onChange={(event) => {
                    setValue('phone', sanitizePhoneInput(event.target.value), {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                />
                <span className="form-helper">Исходное значение из API: {user.phone}</span>
                {errors.phone && <span className="form-error">{errors.phone.message}</span>}
              </div>

              <div className="form-field form-field--full">
                <label htmlFor="companyName">Company Name</label>
                <input id="companyName" {...register('companyName')} />
                {errors.companyName && <span className="form-error">{errors.companyName.message}</span>}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <button type="submit" className="btn" disabled={isSubmitting}>
                Сохранить изменения
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => navigate('/')}>
                Отмена
              </button>
            </div>
          </form>

          <aside className="card-surface profile-preview">
            <img src={user.avatarUrl} alt={user.name} />
            <div>
              <h3>{user.name}</h3>
              <p>@{user.username}</p>
            </div>
            <div className="empty-state" style={{ padding: '16px 18px', textAlign: 'left' }}>
              <strong style={{ display: 'block', marginBottom: 8 }}>Что проверяется этим экраном</strong>
              <span>
                Работа с формой, валидацией, загрузкой данных, локальным обновлением пользователя и аккуратным
                UI-состоянием успеха.
              </span>
            </div>
          </aside>
        </div>
      )}

      <SuccessModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
