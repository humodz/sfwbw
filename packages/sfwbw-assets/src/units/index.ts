import { Nation, UnitType } from '@sfwbw/sfwbw-core';

import * as RedUnits from './red';
import * as BlueUnits from './blue';
import * as GreenUnits from './green';
import * as YellowUnits from './yellow';

export const units: Record<Nation, Record<UnitType, string>> = {
  NEUTRAL: RedUnits, // TODO
  RED_STAR: RedUnits,
  BLUE_MOON: BlueUnits,
  GREEN_EARTH: GreenUnits,
  YELLOW_COMET: YellowUnits,
};