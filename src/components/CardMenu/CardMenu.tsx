import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import './CardMenu.scss';

export interface CardMenuItem {
  label: string;
  to?: string;
  onClick?: () => void;
  danger?: boolean;
}

interface CardMenuProps {
  items: CardMenuItem[];
}

export function CardMenu({ items }: CardMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="card-menu" ref={rootRef}>
      <button
        className="card-menu__toggle"
        type="button"
        aria-label="Открыть меню действий"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <div className="card-menu__dropdown">
          {items.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className={`card-menu__item ${item.danger ? 'is-danger' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                className={`card-menu__item ${item.danger ? 'is-danger' : ''}`}
                type="button"
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
