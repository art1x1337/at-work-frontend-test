import './Loader.scss';

interface LoaderProps {
  text?: string;
}

export function Loader({ text = 'Загрузка...' }: LoaderProps) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" />
      <span className="loader__text">{text}</span>
    </div>
  );
}
