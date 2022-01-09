import React from 'react';
import style from '../styles/components/Item.module.sass';

import ITodo from '../types/db';

interface IItemProps {
  data: ITodo;
}

const Item: React.FC<IItemProps> = ({ data }) => {
  const [checkbox, setCheckbox] = React.useState<boolean>(data.isComplete);

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  return (
    <div className={style.container}>
      <div className={style.checkbox} onClick={handleCheckbox}>
        {checkbox ? (
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
            </svg>
          </div>
        ) : (
          <div className={style.deselect}></div>
        )}
      </div>
      {data.content}
    </div>
  );
};

export default Item;
