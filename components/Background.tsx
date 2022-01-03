/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../styles/components/Background.module.sass';

interface IBackgroundProps {
  themeMode: 'string';
}

const Background: React.FC<IBackgroundProps> = ({ themeMode }) => {
  return (
    <picture className={styles.picture}>
      <source
        className={styles.sourceMobile}
        media="(max-width: 468px)"
        srcSet={`./images/bg-mobile-${themeMode}.jpg`}
      />
      <source
        className={styles.sourceMobile}
        media="(max-width: 468px)"
        srcSet={`./images/bg-mobile-${themeMode}.jpg`}
      />
      <img
        className={styles.sourceDesktop}
        src={`/images/bg-desktop-${themeMode}.jpg`}
        alt="background"
      />
    </picture>
  );
};

export default Background;
