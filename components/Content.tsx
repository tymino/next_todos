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
  const [items, setItems] = useState<ITodo[]>([]);

  const [winReady, setwinReady] = useState<boolean>(false);
  useEffect(() => setwinReady(true), []);

  const handleSubmit = async (value: string) => {
    socket.emit('todos:add', value);
  };
  const handleIsDoneTodo = async (index: string) => {
    socket.emit('todos:done', index);
  };
  const handleRemoveTodo = async (index: string) => {
    socket.emit('todos:remove', index);
  };

  useEffect(() => {
    socket.on('todos:update', (data: ITodo[]) => {
      setItems(data);
    });
  }, [socket]);

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <Logo title="todo" />
        <ToggleTheme theme={theme} changeTheme={changeTheme} />
      </header>
      <main className={styles.main}>
        <Input handleSubmit={handleSubmit} />
        {winReady ? (
          <ItemContainer
            items={items}
            setItems={setItems}
            handleIsDoneTodo={handleIsDoneTodo}
            handleRemoveTodo={handleRemoveTodo}
          />
        ) : null}
      </main>
      <footer className={styles.footer}>Drag and drop to reorder list</footer>
    </div>
  );
};

export default Content;
