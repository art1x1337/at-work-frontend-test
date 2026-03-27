import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../api/users';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { Loader } from '../../components/Loader/Loader';
import { UserCard } from '../../components/UserCard/UserCard';
import { useUsersUiStore } from '../../store/usersUiStore';
import { mergeUser } from '../../utils/userHelpers';
import './UsersPage.scss';

export function UsersPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const archivedIds = useUsersUiStore((state) => state.archivedIds);
  const hiddenIds = useUsersUiStore((state) => state.hiddenIds);
  const editedUsers = useUsersUiStore((state) => state.editedUsers);
  const toggleArchive = useUsersUiStore((state) => state.toggleArchive);
  const hideUser = useUsersUiStore((state) => state.hideUser);

  const visibleUsers = useMemo(
    () => (data ?? []).map((user) => mergeUser(user, editedUsers[user.id])),
    [data, editedUsers],
  );

  const activeUsers = visibleUsers.filter(
    (user) => !hiddenIds.includes(user.id) && !archivedIds.includes(user.id),
  );

  const archivedUsers = visibleUsers.filter(
    (user) => !hiddenIds.includes(user.id) && archivedIds.includes(user.id),
  );

  return (
    <div className="users-page">
      <AppHeader />

      <main className="users-page__content">
        <section className="users-page__section">
          <div className="users-page__section-head">
            <h1 className="users-page__title">Активные</h1>
          </div>

          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div className="users-page__message">
              <p>Не получилось загрузить пользователей.</p>
              <button type="button" className="users-page__retry" onClick={() => refetch()}>
                Попробовать ещё раз
              </button>
            </div>
          ) : (
            <>
              <div className="users-page__grid">
                {activeUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onToggleArchive={toggleArchive}
                    onHide={hideUser}
                  />
                ))}
              </div>

              {!activeUsers.length && (
                <p className="users-page__empty">Здесь пока нет активных карточек.</p>
              )}
            </>
          )}
        </section>

        <section className="users-page__section">
          <div className="users-page__section-head">
            <h2 className="users-page__title">Архив</h2>
          </div>

          <div className="users-page__grid">
            {archivedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                archived
                onToggleArchive={toggleArchive}
                onHide={hideUser}
              />
            ))}
          </div>

          {!archivedUsers.length && <p className="users-page__empty">Архив пока пуст.</p>}
        </section>
      </main>
    </div>
  );
}
