import { useEffect } from 'react';
import './SaveModal.scss';

type SaveModalProps = {
  open: boolean;
  onClose: () => void;
};

export const SaveModal = ({ open, onClose }: SaveModalProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="closeButton" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>

        <div className="icon">✓</div>
        <p className="text">Изменения сохранены!</p>
      </div>
    </div>
  );
};