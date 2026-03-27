import type { User } from '../../types/user';
import { CardMenu } from '../CardMenu/CardMenu';
import './UserCard.scss';

type UserCardProps = {
  user: User;
  isArchived?: boolean;
  onArchive?: () => void;
  onActivate?: () => void;
  onHide?: () => void;
};

export const UserCard = ({
  user,
  isArchived = false,
  onArchive,
  onActivate,
  onHide,
}: UserCardProps) => {
  return (
    <article className={`card ${isArchived ? 'archived' : ''}`}>
      <div className="top">
        <div className="userInfo">
          <img src={user.avatar} alt={user.name} className="avatar" />

          <div className="text">
            <div className="username">{user.username}</div>
            <div className="company">{user.companyName}</div>
            <div className="city">{user.city}</div>
          </div>
        </div>

        <CardMenu
          userId={user.id}
          isArchived={isArchived}
          onArchive={onArchive}
          onActivate={onActivate}
          onHide={onHide}
        />
      </div>
    </article>
  );
};