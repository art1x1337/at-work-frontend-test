import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import './CardMenu.scss';

type CardMenuProps = {
  userId: number;
  isArchived?: boolean;
  onArchive?: () => void;
  onActivate?: () => void;
  onHide?: () => void;
};

export const CardMenu = ({
  userId,
  isArchived = false,
  onArchive,
  onActivate,
  onHide,
}: CardMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="menu" ref={rootRef}>
      <button
        className="trigger"
        type="button"
        aria-label="Открыть меню"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ⋮
      </button>

      {isOpen && (
        <div className="dropdown">
          {isArchived ? (
            <button
              type="button"
              onClick={() => {
                onActivate?.();
                setIsOpen(false);
              }}
            >
              Активировать
            </button>
          ) : (
            <>
              <Link to={`/users/${userId}`} onClick={() => setIsOpen(false)}>
                Редактировать
              </Link>

              <button
                type="button"
                onClick={() => {
                  onArchive?.();
                  setIsOpen(false);
                }}
              >
                Архивировать
              </button>

              <button
                type="button"
                onClick={() => {
                  onHide?.();
                  setIsOpen(false);
                }}
              >
                Скрыть
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};