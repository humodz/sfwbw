import neutralCity from './assets/tiles/neutral-city.png';
import redNation from './assets/nations/red.png';
import blueNation from './assets/nations/blue.png';
import greenNation from './assets/nations/green.png';
import yellowNation from './assets/nations/yellow.png';

import { terrain } from './terrain';
import { buildings } from './buildings';

import loading from './assets/icons/loading.gif';
import error from './assets/icons/error.png';

import caroline from './assets/cos/co-caroline.png';
export { default as tilePreviews } from './assets/tile-previews.png';

import { Nation } from '@sfwbw/sfwbw-core';

export { units } from './units';

export const tiles = {
  terrain,
  buildings,
};

export const nations: Record<Nation, string> = {
  NEUTRAL: neutralCity,
  RED_STAR: redNation,
  BLUE_MOON: blueNation,
  GREEN_EARTH: greenNation,
  YELLOW_COMET: yellowNation,
};

export const cos = {
  caroline,
};

export const icons = {
  loading,
  error,
};