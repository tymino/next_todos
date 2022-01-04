/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../styles/components/Background.module.sass';

interface IBackgroundProps {
  theme: string;
}

const Background: React.FC<IBackgroundProps> = ({ theme }) => {
  return (
    <picture className={styles.picture}>
      <source
        className={styles.sourceMobile}
        media="(max-width: 468px)"
        srcSet={`./images/bg-mobile-${theme}.jpg`}
      />
      <source
        className={styles.sourceMobile}
        media="(max-width: 468px)"
        srcSet={`./images/bg-mobile-${theme}.jpg`}
      />
      <img
        className={styles.sourceDesktop}
        src={`/images/bg-desktop-${theme}.jpg`}
        alt="background"
      />
    </picture>
  );
};

export default Background;
