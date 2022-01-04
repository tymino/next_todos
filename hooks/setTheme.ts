import { useState, useEffect } from 'react';

enum ThemeNames {
  Dark = 'dark',
  Light = 'light',
  StorageName = 'todos_theme',
}

const updateColorsTheme = (themeName: string) => {
  let backgroundColor: string = 'hsl(0, 0%, 98%)';
  let elementsColor: string = 'hsl(0, 0%, 100%)';
  let inputColor: string = 'hsl(0, 0%, 52%)';
  let textColor: string = 'hsl(200, 15%, 8%)';
  let shadowColor: string = 'hsl(200, 15%, 8%)';

  if (themeName === ThemeNames.Light) {
    backgroundColor = 'hsl(0, 0%, 98%)';
    elementsColor = 'hsl(0, 0%, 100%)';
    inputColor = 'hsl(0, 0%, 52%)';
    textColor = 'hsl(200, 15%, 8%)';
    shadowColor = 'hsl(200, 15%, 8%)';
  } else {
    backgroundColor = 'hsl(207, 26%, 17%)';
    elementsColor = 'hsl(209, 23%, 22%)';
    inputColor = 'hsl(207, 26%, 17%)';
    textColor = 'hsl(0, 0%, 100%)';
    shadowColor = 'hsl(207, 26%, 17%)';
  }

  document
    .querySelector<HTMLElement>(':root')
    ?.style.setProperty('--background-color', backgroundColor);
  document
    .querySelector<HTMLElement>(':root')
    ?.style.setProperty('--elements-color', elementsColor);
  document
    .querySelector<HTMLElement>(':root')
    ?.style.setProperty('--input-color', inputColor);
  document
    .querySelector<HTMLElement>(':root')
    ?.style.setProperty('--text-color', textColor);
  document
    .querySelector<HTMLElement>(':root')
    ?.style.setProperty('--shadow-color', shadowColor);
};

const useTheme = () => {
  const [theme, setTheme] = useState<string>(ThemeNames.Light);

  const toggleTheme = () => {
    if (theme !== ThemeNames.Dark) {
      localStorage.setItem('todos_theme', ThemeNames.Dark);
      setTheme(ThemeNames.Dark);
    } else {
      localStorage.setItem('todos_theme', ThemeNames.Light);
      setTheme(ThemeNames.Light);
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem(ThemeNames.StorageName);

    if (localTheme) setTheme(localTheme);
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
