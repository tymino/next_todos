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

  const handleClick = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (input.length > 2) {
      handleSubmit(input);
      setInput('');
    }
  };

  return (
    <form className={style.container}>
      <button className={style.addButton} onClick={handleClick}></button>
      <input
        className={style.input}
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Create a new todo..."
      />
    </form>
  );
};

export default Input;
