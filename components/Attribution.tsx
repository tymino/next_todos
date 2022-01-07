import React from 'react';
import style from '../styles/components/Attribution.module.sass';

const Attribution: React.FC = () => {
  return (
    <div className={style.attribution}>
      Challenge by{' '}
      <a
        href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW"
        target="_blank"
        rel="noreferrer">
        Frontend Mentor
      </a>
      . Coded by{' '}
      <a
        href="https://www.frontendmentor.io/profile/tymino"
        target="_blank"
        rel="noreferrer">
        tymino
      </a>
      .
    </div>
  );
};

export default Attribution;
