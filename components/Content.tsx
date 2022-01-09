import React, { useState, useEffect, FC } from 'react';
import styles from '../styles/components/Content.module.sass';

import { io, Socket } from 'socket.io-client';

import Logo from './Logo';
import ToggleTheme from './ToggleTheme';
import Input from './Input';
import ItemContainer from './ItemContainer';

import ITodo from '../types/db';

interface IContentProps {
  theme: string;
  changeTheme: (theme: string) => void;
}

const Content: React.FC<IContentProps> = ({ theme, changeTheme }) => {
  const [socket, setSocket] = useState<Socket>(io);
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<ITodo[]>([]);
  const [winReady, setwinReady] = useState<boolean>(false);

  useEffect(() => setwinReady(true), []);

  const handleSubmit = async () => {
    // socket.emit('test', value);
    // setValue('');
  };

  useEffect(() => {
    socket.on('todos:init', (data: ITodo[]) => {
      setItems(data);
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
  }, [socket]);

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <Logo title="todo" />
        <ToggleTheme theme={theme} changeTheme={changeTheme} />
      </header>
      <main className={styles.main}>
        <Input inputValue={inputValue} setInputValue={setInputValue} />
        {winReady ? <ItemContainer items={items} setItems={setItems} /> : null}
      </main>
      <footer className={styles.footer}>Drag and drop to reorder list</footer>
    </div>
  );
};

export default Content;
