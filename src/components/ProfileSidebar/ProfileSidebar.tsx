import './ProfileSidebar.scss';

type ProfileSidebarProps = {
  imageUrl: string;
  username: string;
};

export const ProfileSidebar = ({ imageUrl, username }: ProfileSidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="imageWrap">
        <img src={imageUrl} alt={username} className="image" />
      </div>

      <div className="menu">
        <button type="button" className="item active">
          Данные профиля
        </button>
        <button type="button" className="item">
          Рабочее пространство
        </button>
        <button type="button" className="item">
          Приватность
        </button>
        <button type="button" className="item">
          Безопасность
        </button>
      </div>
    </aside>
  );
};