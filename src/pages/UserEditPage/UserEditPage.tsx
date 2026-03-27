import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchUserById } from '../../api/users';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { Loader } from '../../components/Loader/Loader';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';
import { SaveModal } from '../../components/SaveModal/SaveModal';
import { useUsersUiStore } from '../../store/usersUiStore';
import { mergeUser } from '../../utils/userHelpers';
import type { User } from '../../types/user';
import './UserEditPage.scss';

interface UserFormValues {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
}

function createUserSchema(initialPhone: string) {
  return z.object({
    name: z.string().trim().min(2, 'От 2 до 64 символов').max(64, 'От 2 до 64 символов'),
    username: z.string().trim().min(2, 'От 2 до 64 символов').max(64, 'От 2 до 64 символов'),
    email: z.string().trim().email('Введите корректную почту'),
    city: z.string().trim().min(2, 'От 2 до 64 символов').max(64, 'От 2 до 64 символов'),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => value === initialPhone || /^\d+$/.test(value),
        'Телефон — только цифры',
      ),
    companyName: z
      .string()
      .trim()
      .min(2, 'От 2 до 64 символов')
      .max(64, 'От 2 до 64 символов'),
  });
}

export function UserEditPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const userId = Number(params.id);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    enabled: Number.isFinite(userId),
  });

  const editedUser = useUsersUiStore((state) => state.editedUsers[userId]);
  const saveEditedUser = useUsersUiStore((state) => state.saveEditedUser);

  const user = useMemo<User | undefined>(() => {
    if (!data) {
      return undefined;
    }

    return mergeUser(data, editedUser);
  }, [data, editedUser]);

  const schema = useMemo(() => createUserSchema(user?.phone ?? ''), [user?.phone]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(schema),
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
  }, [user, reset]);

  const onSubmit = (values: UserFormValues) => {
    if (!user) {
      return;
    }

    saveEditedUser({
      ...user,
      ...values,
    });

    setIsModalOpen(true);
  };

  if (!Number.isFinite(userId)) {
    return null;
  }

  return (
    <div className="user-edit-page">
      <AppHeader />

      <main className="user-edit-page__content">
        <button className="user-edit-page__back" type="button" onClick={() => navigate(-1)}>
          <span aria-hidden="true">←</span>
          Назад
        </button>

        {isLoading ? (
          <Loader />
        ) : isError || !user ? (
          <div className="user-edit-page__message">
            <p>Не получилось загрузить профиль.</p>
            <button type="button" className="user-edit-page__retry" onClick={() => refetch()}>
              Попробовать ещё раз
            </button>
          </div>
        ) : (
          <div className="user-edit-page__layout">
            <ProfileSidebar imageUrl={user.avatar} username={user.username} />

            <section className="user-edit-page__form-card">
              <h1 className="user-edit-page__title">Данные профиля</h1>

              <form className="user-edit-page__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="user-edit-page__field">
                  <label htmlFor="name">Имя</label>
                  <input id="name" type="text" {...register('name')} />
                  {errors.name && <span className="user-edit-page__error">{errors.name.message}</span>}
                </div>

                <div className="user-edit-page__field">
                  <label htmlFor="username">Никнейм</label>
                  <input id="username" type="text" {...register('username')} />
                  {errors.username && (
                    <span className="user-edit-page__error">{errors.username.message}</span>
                  )}
                </div>

                <div className="user-edit-page__field">
                  <label htmlFor="email">Почта</label>
                  <input id="email" type="email" {...register('email')} />
                  {errors.email && <span className="user-edit-page__error">{errors.email.message}</span>}
                </div>

                <div className="user-edit-page__field">
                  <label htmlFor="city">Город</label>
                  <input id="city" type="text" {...register('city')} />
                  {errors.city && <span className="user-edit-page__error">{errors.city.message}</span>}
                </div>

                <div className="user-edit-page__field">
                  <label htmlFor="phone">Телефон</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="phone"
                        type="text"
                        inputMode="numeric"
                        value={field.value}
                        onFocus={() => {
                          if (field.value === user.phone) {
                            field.onChange(user.phone.replace(/\D/g, ''));
                          }
                        }}
                        onChange={(event) => {
                          const nextValue = event.target.value;

                          if (nextValue === user.phone) {
                            field.onChange(nextValue);
                            return;
                          }

                          field.onChange(nextValue.replace(/\D/g, ''));
                        }}
                      />
                    )}
                  />
                  {errors.phone && <span className="user-edit-page__error">{errors.phone.message}</span>}
                </div>

                <div className="user-edit-page__field">
                  <label htmlFor="companyName">Название компании</label>
                  <input id="companyName" type="text" {...register('companyName')} />
                  {errors.companyName && (
                    <span className="user-edit-page__error">{errors.companyName.message}</span>
                  )}
                </div>

                <button className="user-edit-page__submit" type="submit">
                  Сохранить
                </button>
              </form>
            </section>
          </div>
        )}
      </main>

      <SaveModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
