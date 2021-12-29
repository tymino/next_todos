import React from 'react';
import style from '../styles/components/Attribution.module.sass';

const Attribution: React.FC = () => {
  return (
    <div className={style.attribution}>
      Challenge by{' '}
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </div>
  );
};

export default Attribution;
