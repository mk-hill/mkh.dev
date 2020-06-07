import { addListeners } from './util';

const themes = {
  light: {
    '--bg-primary': '#dcdcdd',
    '--bg-secondary': '#d4d7d8',
    '--bg-highlight': '#cdd7d5',
    '--fg-primary': '#36393c',
    '--highlight-primary': '#2a9d8f',
    '--highlight-secondary': '#11829e',
  },

  dark: {
    '--bg-primary': '#212125',
    '--bg-secondary': '#232327',
    '--bg-highlight': '#212328',
    '--fg-primary': '#f8eed9',
    '--highlight-primary': '#10e0fc',
    '--highlight-secondary': '#11829e',
  },
};

const defaultTheme = 'dark';

export function createThemeListeners() {
  const themeButton = document.querySelector('#theme-button');
  let currentTheme = defaultTheme;

  const switchTheme = () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.className = `theme-${currentTheme}`;
    Object.entries(themes[currentTheme]).forEach(([key, val]) => document.documentElement.style.setProperty(key, val));
    themeButton.blur();
  };

  addListeners(themeButton, switchTheme);
}
