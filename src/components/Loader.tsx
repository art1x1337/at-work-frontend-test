import './Loader.scss';

export const Loader = ({ label = 'Загрузка...' }: { label?: string }) => {
  return (
    <div className="loader-box" role="status" aria-live="polite">
      <span className="loader-spinner" />
      <span>{label}</span>
    </div>
  );
};
