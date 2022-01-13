import React, { useState, useEffect, FC } from 'react';
import styles from '../styles/components/Content.module.sass';

import { io, Socket } from 'socket.io-client';

import Logo from './Logo';
import ToggleTheme from './ToggleTheme';
import Input from './Input';
import ItemContainer from './ItemContainer';

import ITodo from '../types/db';
import EventName from '../types/EventName';

interface IContentProps {
  theme: string;
  toggleTheme: () => void;
}

const Content: React.FC<IContentProps> = ({ theme, toggleTheme }) => {
  const [socket, setSocket] = useState<Socket>(io);
  const [items, setItems] = useState<ITodo[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const [winReady, setwinReady] = useState<boolean>(false);
  useEffect(() => setwinReady(true), []);

  const handleSubmit = async (value: string) => {
    socket.emit(EventName.TODOS_ADD, value);
  };
  const handleIsDoneTodo = async (index: string) => {
    socket.emit(EventName.TODOS_DONE, index);
  };
  const handleRemoveTodo = async (index: string) => {
    socket.emit(EventName.TODOS_REMOVE, index);
  };

  const reorderTodos = async (reorderItems: ITodo[]) => {
    setItems(reorderItems);
    socket.emit(EventName.TODOS_REORDER, reorderItems);
  };

  useEffect(() => {
    socket.on(EventName.TODOS_UPDATE, (data: ITodo[]) => {
      setItems(data);
    });
  }, [socket]);

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <Logo title="todo" />
        <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main className={styles.main}>
        <Input handleSubmit={handleSubmit} />
        {winReady ? (
          <ItemContainer
            isSorted={isSorted}
            items={items}
            reorderTodos={reorderTodos}
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
