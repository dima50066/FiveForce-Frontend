// import clsx from 'clsx';
// import css from './SharedLayout.module.css';

// Заглушка для контенту
const PlaceholderContent = () => <div>Placeholder Content</div>;

export default function SharedLayout({ children }) {
  return <div className={''}>{children || <PlaceholderContent />}</div>;
}
