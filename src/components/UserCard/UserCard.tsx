import './UserCard.scss';
import type { User } from '../../types/user';
import { CardMenu, type CardMenuItem } from '../CardMenu/CardMenu';

interface UserCardProps {
  user: User;
  archived?: boolean;
  onToggleArchive: (id: number) => void;
  onHide: (id: number) => void;
}

export function UserCard({
  user,
  archived = false,
  onToggleArchive,
  onHide,
}: UserCardProps) {
  const menuItems: CardMenuItem[] = archived
    ? [{ label: 'Активировать', onClick: () => onToggleArchive(user.id) }]
    : [
        { label: 'Редактировать', to: `/users/${user.id}` },
        { label: 'Архивировать', onClick: () => onToggleArchive(user.id) },
        { label: 'Скрыть', onClick: () => onHide(user.id) },
      ];

  return (
    <article className={`user-card ${archived ? 'is-archived' : ''}`}>
      <div className="user-card__media">
        <img src={user.avatar} alt={user.username} className="user-card__image" />
      </div>

      <div className="user-card__content">
        <div className="user-card__header">
          <div className="user-card__title-group">
            <h3 className="user-card__username">{user.username}</h3>
            <p className="user-card__company">{user.companyName}</p>
          </div>

          <CardMenu items={menuItems} />
        </div>

        <p className="user-card__city">{user.city}</p>
      </div>
    </article>
  );
}
