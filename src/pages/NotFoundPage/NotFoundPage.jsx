import React from 'react';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <title>Page Not Found</title>
      <img
        src="https://i.ibb.co/W6tgcKQ/softcodeon.gif"
        alt="Page Not Found"
        className={styles.notFoundImage}
      />
      <h1 className={styles.errorText}>
        Whoops, We can't seem to find the resource you're looking for.
      </h1>
      <p className={styles.text}>
        Please check that the Web site address is spelled correctly. Or,
      </p>
      <div className={styles.btnContainer}>
        <a className={styles.errorButton} href="/">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
