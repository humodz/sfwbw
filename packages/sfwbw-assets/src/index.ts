import neutralAirport from './tiles/neutral-airport.png';
import neutralBase from './tiles/neutral-base.png';
import neutralCity from './tiles/neutral-city.png';
import neutralHq from './tiles/neutral-hq.png';
import neutralLab from './tiles/neutral-lab.png';
import neutralPort from './tiles/neutral-port.png';
import neutralStation from './tiles/neutral-station.png';

import redAirport from './tiles/red-airport.png';
import redBase from './tiles/red-base.png';
import redCity from './tiles/red-city.png';
import redHq from './tiles/red-hq.png';
import redLab from './tiles/red-lab.png';
import redPort from './tiles/red-port.png';
import redStation from './tiles/red-station.png';

import blueAirport from './tiles/blue-airport.png';
import blueBase from './tiles/blue-base.png';
import blueCity from './tiles/blue-city.png';
import blueHq from './tiles/blue-hq.png';
import blueLab from './tiles/blue-lab.png';
import bluePort from './tiles/blue-port.png';
import blueStation from './tiles/blue-station.png';

import greenAirport from './tiles/green-airport.png';
import greenBase from './tiles/green-base.png';
import greenCity from './tiles/green-city.png';
import greenHq from './tiles/green-hq.png';
import greenLab from './tiles/green-lab.png';
import greenPort from './tiles/green-port.png';
import greenStation from './tiles/green-station.png';

import yellowAirport from './tiles/yellow-airport.png';
import yellowBase from './tiles/yellow-base.png';
import yellowCity from './tiles/yellow-city.png';
import yellowHq from './tiles/yellow-hq.png';
import yellowLab from './tiles/yellow-lab.png';
import yellowPort from './tiles/yellow-port.png';
import yellowStation from './tiles/yellow-station.png';

import plains from './tiles/plains.png';
import forest from './tiles/forest.png';
import mountain from './tiles/mountain.png';
import stronghold from './tiles/stronghold.png';
import road from './tiles/road.png';
import bridge from './tiles/bridge.png';
import rail from './tiles/rail.png';
import sea from './tiles/sea.png';
import shoal from './tiles/shoal.png';
import river from './tiles/river.png';

import redNation from './nations/red.png';
import blueNation from './nations/blue.png';
import greenNation from './nations/green.png';
import yellowNation from './nations/yellow.png';

export const tiles = {
  terrain: {
    plains,
    forest,
    mountain,
    stronghold,
    road,
    bridge,
    rail,
    sea,
    shoal,
    river,
  },

  buildings: {
    neutral: {
      airport: neutralAirport,
      base: neutralBase,
      city: neutralCity,
      hq: neutralHq,
      lab: neutralLab,
      port: neutralPort,
      station: neutralStation,
    },
    red: {
      airport: redAirport,
      base: redBase,
      city: redCity,
      hq: redHq,
      lab: redLab,
      port: redPort,
      station: redStation,
    },
    blue: {
      airport: blueAirport,
      base: blueBase,
      city: blueCity,
      hq: blueHq,
      lab: blueLab,
      port: bluePort,
      station: blueStation,
    },
    green: {
      airport: greenAirport,
      base: greenBase,
      city: greenCity,
      hq: greenHq,
      lab: greenLab,
      port: greenPort,
      station: greenStation,
    },
    yellow: {
      airport: yellowAirport,
      base: yellowBase,
      city: yellowCity,
      hq: yellowHq,
      lab: yellowLab,
      port: yellowPort,
      station: yellowStation,
    },
  },
};

export const nations = {
  neutral: neutralCity,
  red: redNation,
  blue: blueNation,
  green: greenNation,
  yellow: yellowNation,
};