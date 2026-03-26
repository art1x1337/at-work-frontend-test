import { useEffect } from 'react';
import './SuccessModal.scss';

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const timer = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timer);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Закрыть окно">
          ×
        </button>
        <div className="modal-icon">✓</div>
        <h2 id="success-modal-title">Данные сохранены</h2>
        <p>Изменения успешно применены в рамках текущей сессии.</p>
      </div>
    </div>
  );
};
