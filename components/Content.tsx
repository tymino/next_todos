import React, { useState, useEffect, FC } from 'react';
import styles from '../styles/components/Content.module.sass';

import { io, Socket } from 'socket.io-client';

import Logo from './Logo';
import ToggleTheme from './ToggleTheme';
import Input from './Input';
import ItemContainer from './ItemContainer';
import ItemControl from './ItemControl';

import ITodo from '../types/db';
import EventName from '../types/EventName';
import SortedName from '../types/SortedName';

interface IContentProps {
  theme: string;
  toggleTheme: () => void;
}

const Content: React.FC<IContentProps> = ({ theme, toggleTheme }) => {
  const [socket] = useState<Socket>(io);
  const [items, setItems] = useState<ITodo[]>([]);

  const [sortedActive, setSortedActive] = useState<string>(SortedName.SORT_ALL);
  const [sortedNames] = useState<string[]>([
    SortedName.SORT_ALL,
    SortedName.SORT_ACTIVE,
    SortedName.SORT_COMPLETED,
  ]);
  const [sortedItems, setSortedItems] = useState<ITodo[]>([]);

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
  const handleClearCompleted = async () => {
    socket.emit(EventName.TODOS_CLEAR_COMPLETED);
  };

  const reorderTodos = async (reorderItems: ITodo[]) => {
    setItems(reorderItems);
    socket.emit(EventName.TODOS_REORDER, reorderItems);
  };

  const handleSortTodos = (name: string) => {
    // if (name === sortedActive) return;

    const filterItems = items.filter((item) => {
      if (name === SortedName.SORT_ACTIVE) return !item.isComplete;
      if (name === SortedName.SORT_COMPLETED) return item.isComplete;
    });

    setSortedActive(name);
    setSortedItems(filterItems);
  };

  useEffect(() => {
    socket.on(EventName.TODOS_UPDATE, (data: ITodo[]) => {
      setItems(data);
    });
  }, [socket]);

  useEffect(() => {
    if (sortedActive === SortedName.SORT_ALL) return;
    handleSortTodos(sortedActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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
            sortedActive={sortedActive}
            items={sortedActive !== SortedName.SORT_ALL ? sortedItems : items}
            reorderTodos={reorderTodos}
            handleIsDoneTodo={handleIsDoneTodo}
            handleRemoveTodo={handleRemoveTodo}
          />
        ) : null}
        <ItemControl
          itemLeft={sortedActive !== SortedName.SORT_ALL ? sortedItems.length : items.length}
          sortedActive={sortedActive}
          sortedNames={sortedNames}
          handleSortTodos={handleSortTodos}
          handleClearCompleted={handleClearCompleted}
        />
      </main>
      <footer className={styles.footer}>Drag and drop to reorder list</footer>
    </div>
  );
};

export default Content;
