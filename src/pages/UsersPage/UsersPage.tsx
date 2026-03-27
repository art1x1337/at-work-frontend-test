import { useQuery } from '@tanstack/react-query';

import { fetchUsers } from '../../api/users';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { Loader } from '../../components/Loader/Loader';
import { UserCard } from '../../components/UserCard/UserCard';
import { useUsersStore } from '../../store/usersStore';
import type { User } from '../../types/user';
import './UsersPage.scss';

export function UsersPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const archivedIds = useUsersStore((state) => state.archivedIds);
  const hiddenIds = useUsersStore((state) => state.hiddenIds);
  const editedUsers = useUsersStore((state) => state.editedUsers);
  const archiveUser = useUsersStore((state) => state.archiveUser);
  const restoreUser = useUsersStore((state) => state.restoreUser);
  const hideUser = useUsersStore((state) => state.hideUser);

  const users: User[] = (data ?? []).map((user) => {
  const editedUser = editedUsers[user.id];

  if (!editedUser) {
    return user;
  }

  return {
    ...user,
    ...editedUser,
  };
});

  const activeUsers = users.filter(
    (user) => !hiddenIds.includes(user.id) && !archivedIds.includes(user.id),
  );

  const archivedUsers = users.filter(
    (user) => !hiddenIds.includes(user.id) && archivedIds.includes(user.id),
  );

  return (
    <div className="page">
      <AppHeader />

      <main className="content">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className="message">
            <p>Не получилось загрузить пользователей.</p>
            <button type="button" className="retryButton" onClick={() => refetch()}>
              Попробовать ещё раз
            </button>
          </div>
        ) : (
          <>
            <section className="section">
              <h1 className="sectionTitle">Активные</h1>

              {activeUsers.length ? (
                <div className="grid">
                  {activeUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onArchive={() => archiveUser(user.id)}
                      onHide={() => hideUser(user.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="emptyText">Активных пользователей нет.</p>
              )}
            </section>

            <section className="section">
              <h2 className="sectionTitle">Архив</h2>

              {archivedUsers.length ? (
                <div className="grid">
                  {archivedUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      isArchived
                      onActivate={() => restoreUser(user.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="emptyText">Архив пока пуст.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}