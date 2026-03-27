import { useEffect } from 'react';
import './SaveModal.scss';

interface SaveModalProps {
  open: boolean;
  onClose: () => void;
}

export function SaveModal({ open, onClose }: SaveModalProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const timeoutId = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timeoutId);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="save-modal" onClick={onClose} role="presentation">
      <div
        className="save-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Изменения сохранены"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="save-modal__close"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        >
          ×
        </button>

        <div className="save-modal__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12.5 9.4 17 19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="save-modal__text">Изменения сохранены!</p>
      </div>
    </div>
  );
}
