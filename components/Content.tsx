import React from 'react';
import styles from '../styles/components/Content.module.sass';

import Logo from './Logo';
import ToggltTheme from './ToggltTheme';
import Input from './Input';
import ItemContainer from './ItemContainer';

const Content: React.FC = () => {
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <Logo title="todo" />
        <ToggltTheme theme="light" />
      </header>
      <main className={styles.main}>
        <Input />
        <ItemContainer />
      </main>
      <footer className={styles.footer}>Drag and drop to reorder list</footer>
    </div>
  );
};

export default Content;
