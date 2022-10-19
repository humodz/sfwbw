import neutralAirport from './assets/tiles/neutral-airport.png';
import neutralBase from './assets/tiles/neutral-base.png';
import neutralCity from './assets/tiles/neutral-city.png';
import neutralHq from './assets/tiles/neutral-hq.png';
import neutralLab from './assets/tiles/neutral-lab.png';
import neutralPort from './assets/tiles/neutral-port.png';
import neutralStation from './assets/tiles/neutral-station.png';

import redAirport from './assets/tiles/red-airport.png';
import redBase from './assets/tiles/red-base.png';
import redCity from './assets/tiles/red-city.png';
import redHq from './assets/tiles/red-hq.png';
import redLab from './assets/tiles/red-lab.png';
import redPort from './assets/tiles/red-port.png';
import redStation from './assets/tiles/red-station.png';

import blueAirport from './assets/tiles/blue-airport.png';
import blueBase from './assets/tiles/blue-base.png';
import blueCity from './assets/tiles/blue-city.png';
import blueHq from './assets/tiles/blue-hq.png';
import blueLab from './assets/tiles/blue-lab.png';
import bluePort from './assets/tiles/blue-port.png';
import blueStation from './assets/tiles/blue-station.png';

import greenAirport from './assets/tiles/green-airport.png';
import greenBase from './assets/tiles/green-base.png';
import greenCity from './assets/tiles/green-city.png';
import greenHq from './assets/tiles/green-hq.png';
import greenLab from './assets/tiles/green-lab.png';
import greenPort from './assets/tiles/green-port.png';
import greenStation from './assets/tiles/green-station.png';

import yellowAirport from './assets/tiles/yellow-airport.png';
import yellowBase from './assets/tiles/yellow-base.png';
import yellowCity from './assets/tiles/yellow-city.png';
import yellowHq from './assets/tiles/yellow-hq.png';
import yellowLab from './assets/tiles/yellow-lab.png';
import yellowPort from './assets/tiles/yellow-port.png';
import yellowStation from './assets/tiles/yellow-station.png';

import { Nation, Building } from '@sfwbw/sfwbw-core';

export const buildings: Record<Nation, Record<Building, string>> = {
  NEUTRAL: {
    AIRPORT: neutralAirport,
    BASE: neutralBase,
    CITY: neutralCity,
    HQ: neutralHq,
    LAB: neutralLab,
    PORT: neutralPort,
    STATION: neutralStation,
  },
  RED_STAR: {
    AIRPORT: redAirport,
    BASE: redBase,
    CITY: redCity,
    HQ: redHq,
    LAB: redLab,
    PORT: redPort,
    STATION: redStation,
  },
  BLUE_MOON: {
    AIRPORT: blueAirport,
    BASE: blueBase,
    CITY: blueCity,
    HQ: blueHq,
    LAB: blueLab,
    PORT: bluePort,
    STATION: blueStation,
  },
  GREEN_EARTH: {
    AIRPORT: greenAirport,
    BASE: greenBase,
    CITY: greenCity,
    HQ: greenHq,
    LAB: greenLab,
    PORT: greenPort,
    STATION: greenStation,
  },
  YELLOW_COMET: {
    AIRPORT: yellowAirport,
    BASE: yellowBase,
    CITY: yellowCity,
    HQ: yellowHq,
    LAB: yellowLab,
    PORT: yellowPort,
    STATION: yellowStation,
  },
};