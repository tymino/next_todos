import React from 'react';
import style from '../styles/components/Item.module.sass';

import ITodo from '../types/db';

interface IItemProps {
  data: ITodo;
  handleIsDoneTodo: (index: string) => void;
  handleRemoveTodo: (index: string) => void;
}

const Item: React.FC<IItemProps> = ({ data, handleIsDoneTodo, handleRemoveTodo }) => {
  const { id, isComplete, content } = data;

  const handleCheckbox = () => handleIsDoneTodo(id);
  const handleRemove = () => handleRemoveTodo(id);

  return (
    <div className={style.container}>
      <div className={style.checkbox} onClick={handleCheckbox}>
        {isComplete ? (
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
            </svg>
          </div>
        ) : (
          <div className={style.deselect}></div>
        )}
      </div>
      <div className={isComplete ? style.contentTextDone : style.contentText}>{content}</div>
      <div className={style.svgRemove} onClick={handleRemove}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="#494C6B"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Item;
