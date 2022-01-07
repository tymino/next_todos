import React, { useState, useEffect, FC } from 'react';
import styles from '../styles/components/Content.module.sass';

import { io, Socket } from 'socket.io-client';

import Logo from './Logo';
import ToggleTheme from './ToggleTheme';
import Input from './Input';
import ItemContainer from './ItemContainer';

interface IContentProps {
  theme: string;
  changeTheme: (theme: string) => void;
}

const Content: React.FC<IContentProps> = ({ theme, changeTheme }) => {
  const [socket, setSocket] = useState<Socket>(io);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = async () => {
    // socket.emit('test', value);
    // setValue('');
  };

  useEffect(() => {
    socket.on('now', (data: any) => {
      // setValue(data.message);
    });

    socket.on('test', (message: any) => {
      // chat.push(message);
      // setChat([...chat]);
    });

    // socket.on('connect', () => {
    //   console.log('connect');
    // });

    // socket.on('disconnect', () => {
    //   console.log('disconnect');
    // });
  }, []);

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <Logo title="todo" />
        <ToggleTheme theme={theme} changeTheme={changeTheme} />
      </header>
      <main className={styles.main}>
        <Input inputValue={inputValue} setInputValue={setInputValue} />
        <ItemContainer />
      </main>
      <footer className={styles.footer}>Drag and drop to reorder list</footer>
    </div>
  );
};

export default Content;
