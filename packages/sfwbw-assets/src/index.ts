import neutralCity from './tiles/neutral-city.png';
import redNation from './nations/red.png';
import blueNation from './nations/blue.png';
import greenNation from './nations/green.png';
import yellowNation from './nations/yellow.png';

import { terrain } from './terrain';
import { buildings } from './buildings';

export { default as loading } from './icons/loading.gif';

export const tiles = {
  terrain,
  buildings,
};

export const nations = {
  neutral: neutralCity,
  red: redNation,
  blue: blueNation,
  green: greenNation,
  yellow: yellowNation,
};