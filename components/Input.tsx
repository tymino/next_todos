import React from 'react';
import style from '../styles/components/Input.module.sass';

interface IInputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<IInputProps> = ({ inputValue, setInputValue }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={style.container}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </div>
  );
};

export default Input;
