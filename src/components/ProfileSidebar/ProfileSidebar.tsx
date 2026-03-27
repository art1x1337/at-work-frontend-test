import './ProfileSidebar.scss';

interface ProfileSidebarProps {
  imageUrl: string;
  username: string;
}

export function ProfileSidebar({ imageUrl, username }: ProfileSidebarProps) {
  return (
    <aside className="profile-sidebar">
      <div className="profile-sidebar__image-wrap">
        <img src={imageUrl} alt={username} className="profile-sidebar__image" />
      </div>

      <nav className="profile-sidebar__menu" aria-label="Разделы профиля">
        <button className="profile-sidebar__menu-item is-active" type="button">
          Данные профиля
        </button>
        <button className="profile-sidebar__menu-item" type="button">
          Рабочее пространство
        </button>
        <button className="profile-sidebar__menu-item" type="button">
          Приватность
        </button>
        <button className="profile-sidebar__menu-item" type="button">
          Безопасность
        </button>
      </nav>
    </aside>
  );
}
