import neutralCity from './tiles/neutral-city.png';
import redNation from './nations/red.png';
import blueNation from './nations/blue.png';
import greenNation from './nations/green.png';
import yellowNation from './nations/yellow.png';

import { terrain } from './terrain';
import { buildings } from './buildings';

import loading from './icons/loading.gif';
import error from './icons/error.png';

import caroline from './cos/co-caroline.png';
export { default as tilePreviews } from './tile-previews.png';

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

export const cos = {
  caroline,
};

export const icons = {
  loading,
  error,
};