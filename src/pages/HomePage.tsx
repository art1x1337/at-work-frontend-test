import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import { Loader } from '../components/Loader';
import { UserCard } from '../components/UserCard';
import { useUsersStore } from '../store/usersStore';
import type { User } from '../types/user';

const applyStoreState = (
  users: User[],
  archivedIds: number[],
  hiddenIds: number[],
  getMergedUser: (user: User) => User,
) => {
  const visibleUsers = users.filter((user) => !hiddenIds.includes(user.id)).map(getMergedUser);

  return {
    active: visibleUsers.filter((user) => !archivedIds.includes(user.id)),
    archived: visibleUsers.filter((user) => archivedIds.includes(user.id)),
  };
};

export const HomePage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const archivedIds = useUsersStore((state) => state.archivedIds);
  const hiddenIds = useUsersStore((state) => state.hiddenIds);
  const archiveUser = useUsersStore((state) => state.archiveUser);
  const activateUser = useUsersStore((state) => state.activateUser);
  const hideUser = useUsersStore((state) => state.hideUser);
  const getMergedUser = useUsersStore((state) => state.getMergedUser);

  const sections = useMemo(() => {
    if (!data) {
      return { active: [], archived: [] };
    }

    return applyStoreState(data, archivedIds, hiddenIds, getMergedUser);
  }, [archivedIds, data, getMergedUser, hiddenIds]);

  return (
    <div className="page">
      <header className="page__topbar">
        <div className="page__headline">
          <h1>Пользователи AT-WORK</h1>
          <p>
            Тестовый SPA-интерфейс: список сотрудников, архив, скрытие карточек и редактирование
            профиля без лишнего шума.
          </p>
        </div>
        <div className="page__badge">React + Zustand + Query</div>
      </header>

      {isLoading && <Loader label="Загружаем пользователей..." />}

      {isError && (
        <div className="empty-state">{error instanceof Error ? error.message : 'Что-то пошло не так.'}</div>
      )}

      {!isLoading && !isError && (
        <>
          <section className="section">
            <div className="section__title">
              <h2>Активные</h2>
              <span>{sections.active.length}</span>
            </div>
            {sections.active.length ? (
              <div className="grid">
                {sections.active.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onArchive={() => archiveUser(user.id)}
                    onHide={() => hideUser(user.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">Активных карточек нет — попробуйте вернуть кого-то из архива.</div>
            )}
          </section>

          <section className="section">
            <div className="section__title">
              <h2>Архив</h2>
              <span>{sections.archived.length}</span>
            </div>
            {sections.archived.length ? (
              <div className="grid">
                {sections.archived.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isArchived
                    onActivate={() => activateUser(user.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">Архив пока пуст — сюда попадают архивированные карточки.</div>
            )}
          </section>
        </>
      )}
    </div>
  );
};
