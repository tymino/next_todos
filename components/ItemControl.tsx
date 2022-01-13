import React from 'react';
import style from '../styles/components/ItemControl.module.sass';

interface ItemControl {
  itemLeft: number;
  sortedActive: string;
  sortedNames: string[];
  handleSortTodos: (name: string) => void;
  handleClearCompleted: () => void;
}

const ItemControl: React.FC<ItemControl> = ({
  itemLeft,
  sortedActive,
  sortedNames,
  handleSortTodos,
  handleClearCompleted,
}) => {
  const handleSort = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetName = String((e.target as HTMLDivElement).dataset.name);

    handleSortTodos(targetName);
  };

  return (
    <div className={style.containerGrid}>
      <div className={style.itemLeft}>{`${itemLeft} items left`}</div>
      <div className={style.clearCompleted} onClick={handleClearCompleted}>
        Clear Completed
      </div>
      <div className={style.sortedWrapper}>
        {sortedNames.map((name, index) => {
          return (
            <div
              className={sortedActive === name ? style.sortButtonActive : style.sortButton}
              key={name + index}
              data-name={name}
              onClick={handleSort}>
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemControl;
