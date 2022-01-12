import { useState, useEffect } from 'react';

enum ThemeNames {
  Dark = 'dark',
  Light = 'light',
  StorageName = 'todos_theme',
}

const useTheme = () => {
  const [theme, setTheme] = useState<string>(ThemeNames.Light);

  const updateColorsTheme = (themeName: string) => {
    let color1: string = '';
    let color2: string = '';
    let color3: string = '';
    let color4: string = '';
    let color5: string = '';
  
    if (themeName === ThemeNames.Light) {
      color1 = 'hsl(0, 0%, 98%)';
      color2 = 'hsl(236, 33%, 92%)';
      color3 = 'hsl(233, 11%, 84%)';
      color4 = 'hsl(236, 9%, 61%)';
      color5 = 'hsl(235, 19%, 35%)';
    } else {
      color1 = 'hsl(235, 24%, 19%)';
      color2 = 'hsl(235, 21%, 11%)';
      color3 = 'hsl(234, 11%, 52%)';
      color4 = 'hsl(234, 39%, 85%)';
      color5 = 'hsl(235, 19%, 35%)';
    }
  
    document.querySelector<HTMLElement>(':root')?.style.setProperty('--very-light-gray', color1);
    document.querySelector<HTMLElement>(':root')?.style.setProperty('--very-light-grayish-blue', color2);
    document.querySelector<HTMLElement>(':root')?.style.setProperty('--light-grayish-blue', color3);
    document.querySelector<HTMLElement>(':root')?.style.setProperty('--dark-grayish-blue', color4);
    document.querySelector<HTMLElement>(':root')?.style.setProperty('--very-dark-grayish-blue', color5);
  };

  const toggleTheme = () => {
    if (theme !== ThemeNames.Dark) {
      localStorage.setItem('todos_theme', ThemeNames.Dark);
      setTheme(ThemeNames.Dark);
      updateColorsTheme(ThemeNames.Dark);
    } else {
      localStorage.setItem('todos_theme', ThemeNames.Light);
      setTheme(ThemeNames.Light);
      updateColorsTheme(ThemeNames.Light);
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem(ThemeNames.StorageName);

    if (localTheme) setTheme(localTheme);
  }, []);

  return [theme, toggleTheme];
};

export default useTheme;
