import React from 'react';
import style from '../styles/components/Logo.module.sass';

interface ILogoProps {
  title: string;
}

const Logo: React.FC<ILogoProps> = ({ title }) => {
  return <div className={style.logo}>{title}</div>;
};

export default Logo;
