import { useEffect, useState } from 'react';
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
import { useUsersStore } from '../../store/usersStore';
import type { EditableUserFields, User } from '../../types/user';
import './UserEditPage.scss';

type UserFormValues = {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
};

const userSchema = z.object({
  name: z.string().trim().min(2, 'От 2 до 64 символов').max(64, 'От 2 до 64 символов'),
  username: z.string().trim().min(2, 'От 2 до 64 символов').max(64, 'От 2 до 64 символов'),
  email: z.string().trim().email('Введите корректную почту'),
  city: z.string().trim().min(2, 'От 2 до 64 символов').max(64, 'От 2 до 64 символов'),
  phone: z.string().trim().regex(/^\d+$/, 'Телефон — только цифры'),
  companyName: z.string().trim().min(2, 'От 2 до 64 символов').max(64, 'От 2 до 64 символов'),
});

const normalizePhone = (value: string) => value.replace(/\D/g, '');

export function UserEditPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const userId = Number(params.id);

  const editedUser = useUsersStore((state) => state.editedUsers[userId]);
  const saveUserChanges = useUsersStore((state) => state.saveUserChanges);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    enabled: Number.isFinite(userId),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
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

  let user: User | null = null;

  if (data) {
    user = {
      ...data,
      ...editedUser,
    };
  }

  useEffect(() => {
  if (!data) {
    return;
  }

  const nextUser = editedUser
    ? { ...data, ...editedUser }
    : data;

  reset({
    name: nextUser.name,
    username: nextUser.username,
    email: nextUser.email,
    city: nextUser.city,
    phone: nextUser.phone,
    companyName: nextUser.companyName,
  });
}, [data, reset]);

  const onSubmit = (values: UserFormValues) => {
  if (!user) {
    return;
  }

  const updatedUser: EditableUserFields = {
    name: values.name,
    username: values.username,
    email: values.email,
    city: values.city,
    phone: values.phone,
    companyName: values.companyName,
    avatar: user.avatar,
  };

  saveUserChanges(user.id, updatedUser);

  reset({
  name: values.name,
  username: values.username,
  email: values.email,
  city: values.city,
  phone: values.phone,
  companyName: values.companyName,
});

  setIsModalOpen(true);
};

  if (!Number.isFinite(userId)) {
    return null;
  }

  return (
    <div className="page">
      <AppHeader />

      <main className="content">
        <button className="backButton" type="button" onClick={() => navigate('/users')}>
        <span aria-hidden="true">←</span>
        Назад
      </button>

        {isLoading ? (
          <Loader />
        ) : isError || !user ? (
          <div className="message">
            <p>Не получилось загрузить профиль.</p>
            <button type="button" className="retryButton" onClick={() => refetch()}>
              Попробовать ещё раз
            </button>
          </div>
        ) : (
          <div className="layout">
            <ProfileSidebar imageUrl={user.avatar} username={user.username} />

            <section className="formCard">
              <h1 className="title">Данные профиля</h1>

              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                  <label htmlFor="name">Имя</label>
                  <input id="name" type="text" {...register('name')} />
                  {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

                <div className="field">
                  <label htmlFor="username">Никнейм</label>
                  <input id="username" type="text" {...register('username')} />
                  {errors.username && <span className="error">{errors.username.message}</span>}
                </div>

                <div className="field">
                  <label htmlFor="email">Почта</label>
                  <input id="email" type="email" {...register('email')} />
                  {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="field">
                  <label htmlFor="city">Город</label>
                  <input id="city" type="text" {...register('city')} />
                  {errors.city && <span className="error">{errors.city.message}</span>}
                </div>

                <div className="field">
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
                          field.onChange(normalizePhone(user.phone));
                        }
                      }}
                      onChange={(event) => {
                        field.onChange(normalizePhone(event.target.value));
                      }}
                    />
                  )}
                />
                  {errors.phone && isSubmitted && <span className="error">{errors.phone.message}</span>}
                </div>

                <div className="field">
                  <label htmlFor="companyName">Название компании</label>
                  <input id="companyName" type="text" {...register('companyName')} />
                  {errors.companyName && <span className="error">{errors.companyName.message}</span>}
                </div>

                <button className="submitButton" type="submit">
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