import plains from './assets/tiles/plains.png';
import forest from './assets/tiles/forest.png';
import mountain from './assets/tiles/mountain.png';
import stronghold from './assets/tiles/stronghold.png';
import road from './assets/tiles/road.png';
import bridge from './assets/tiles/bridge.png';
import rail from './assets/tiles/rail.png';
import sea from './assets/tiles/sea.png';
import shoal from './assets/tiles/shoal.png';
import river from './assets/tiles/river.png';
import { Terrain } from '@sfwbw/sfwbw-core';

export const terrain: Record<Terrain, string> = {
  PLAINS: plains,
  FOREST: forest,
  MOUNTAIN: mountain,
  STRONGHOLD: stronghold,
  ROAD: road,
  BRIDGE: bridge,
  RAIL: rail,
  SEA: sea,
  SHOAL: shoal,
  RIVER: river,
};