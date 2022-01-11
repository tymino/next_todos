import React, { useState } from 'react';
import style from '../styles/components/Input.module.sass';

interface IInputProps {
  handleSubmit: (value: string) => void;
}

const Input: React.FC<IInputProps> = ({ handleSubmit }) => {
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input.length >= 0 && input.length < 100) {
      setInput(e.target.value);
    }
  };

  const handleClick = () => {
    handleSubmit(input);
    setInput('');
  };

  return (
    <div className={style.container}>
      <div className={style.addButton} onClick={handleClick}></div>
      <input
        className={style.input}
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Create a new todo..."
      />
    </div>
  );
};

export default Input;
