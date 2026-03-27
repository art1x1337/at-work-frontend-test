import { Link } from 'react-router';
import type { User } from '../types/user';
import './UserCard.scss';

type UserCardProps = {
  user: User;
  isArchived?: boolean;
  onArchive?: () => void;
  onActivate?: () => void;
  onHide?: () => void;
};

export const UserCard = ({ user, isArchived = false, onArchive, onActivate, onHide }: UserCardProps) => {
  return (
    <article className={`user-card ${isArchived ? 'user-card--archived' : ''}`}>
      <div className="user-card__header">
        <img src={user.avatar} alt={user.name} className="user-card__avatar" />
        <div>
          <span className="user-card__label">@{user.username}</span>
          <h3>{user.name}</h3>
        </div>
      </div>

      <dl className="user-card__meta">
        <div>
          <dt>Город</dt>
          <dd>{user.city}</dd>
        </div>
        <div>
          <dt>Компания</dt>
          <dd>{user.companyName}</dd>
        </div>
      </dl>

      <div className="user-card__actions">
        {!isArchived ? (
          <>
            <Link to={`/users/${user.id}/edit`} className="btn btn--secondary">
              Редактировать
            </Link>
            <button type="button" className="btn btn--ghost" onClick={onArchive}>
              Архивировать
            </button>
            <button type="button" className="btn btn--danger" onClick={onHide}>
              Скрыть
            </button>
          </>
        ) : (
          <button type="button" className="btn" onClick={onActivate}>
            Сделать активной
          </button>
        )}
      </div>
    </article>
  );
};
