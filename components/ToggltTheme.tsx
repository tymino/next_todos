import React from 'react';
import style from '../styles/components/ToggltTheme.module.sass';

interface IToggltThemeProps {
  theme: string;
}

const ToggltTheme: React.FC<IToggltThemeProps> = ({ theme }) => {
  return <div>ToggltTheme</div>;
};

export default ToggltTheme;
