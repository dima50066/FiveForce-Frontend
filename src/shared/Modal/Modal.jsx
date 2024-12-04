import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import Icon from '../Icons/Icon';

export default function Modal({ children, isOpen, onClose, className,classNameWrapper, btnClassName }) {
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('modalIsOpen');
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('modalIsOpen');
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.classList.remove('modalIsOpen');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={`${css.modalWrapper} ${classNameWrapper}`} onClick={e => e.stopPropagation()}>
        <div className={`${css.modal} ${className}`}>
          <button
            className={clsx(css.closeButton, btnClassName)}
            onClick={() => {
              console.log('Close button clicked');
              onClose();
            }}
          >
            <Icon
              id="x-close"
              className={css.closeIcon}
              width="24"
              height="24"
            />
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
