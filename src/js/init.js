import { createAddressListeners } from './address';
import { createActivityListeners } from './activity';
import { createThemeListeners } from './theme';
import { paintDoodle } from './doodle';

export function init() {
  createAddressListeners();
  createActivityListeners();
  createThemeListeners();

  const main = document.querySelector('main');
  main.style.display = 'flex';

  const doodle = document.querySelector('css-doodle');
  if (doodle) paintDoodle(doodle);

  setTimeout(() => {
    main.style.opacity = '1';
  }, 0);
}
