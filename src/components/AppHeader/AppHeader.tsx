import './AppHeader.scss';
import { getHeaderAvatar } from '../../utils/avatars';

interface AppHeaderProps {
  username?: string;
}

export function AppHeader({ username = 'Ivan1234' }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand" aria-label="AT-WORK">
          <span className="app-header__brand-mark">✦</span>
          <span className="app-header__brand-text">at-work</span>
        </div>

        <div className="app-header__actions">
          <button className="app-header__icon-button" type="button" aria-label="Избранное">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 20.4 4.95 15a4.72 4.72 0 0 1-1.95-3.78C3 8.34 5.32 6 8.18 6c1.59 0 3.08.77 3.82 1.98A4.66 4.66 0 0 1 15.82 6C18.68 6 21 8.34 21 11.22A4.72 4.72 0 0 1 19.05 15L12 20.4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="app-header__icon-button" type="button" aria-label="Уведомления">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 4.75a4.25 4.25 0 0 0-4.25 4.25v2.21c0 .83-.25 1.64-.73 2.31l-1.26 1.75c-.39.55 0 1.33.67 1.33h11.14c.67 0 1.06-.78.67-1.33l-1.26-1.75a4 4 0 0 1-.73-2.31V9A4.25 4.25 0 0 0 12 4.75Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.25 18.5a1.75 1.75 0 0 0 3.5 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="app-header__profile">
            <img src={getHeaderAvatar()} alt={username} className="app-header__avatar" />
            <span className="app-header__username">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
