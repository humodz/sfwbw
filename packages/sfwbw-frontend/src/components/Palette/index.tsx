import { nations } from '@sfwbw/sfwbw-assets';
import {
  Nation,
  Tile,
  TileType,
  PredeployedUnit,
  UnitType,
} from '@sfwbw/sfwbw-core';
import produce from 'immer';
import { getTileImage, getUnitImage } from '../../game/assets';
import { cls } from '../../utils/css';

export type PaletteSelection =
  | { type: 'unit'; value: Omit<PredeployedUnit, 'pos'> }
  | { type: 'tile'; value: Tile };

interface PaletteProps {
  selection: PaletteSelection;
  onSelectionChange?: (selection: PaletteSelection) => void;
}

const tileTypes = Object.values(TileType);
const unitTypes = Object.values(UnitType);

const nationNames = Object.values(Nation);

const classes = {
  tile: 'w-[36px] h-[36px] border-2 border-solid border-transparent select-none',
  selected: '!border-white',
};

export function Pallette({ selection, onSelectionChange }: PaletteProps) {
  const selectedPlayer = selection.value.player;

  const selectedTileType =
    selection.type === 'tile' ? tileTypes.indexOf(selection.value.type) : -1;

  const selectedUnitType =
    selection.type === 'unit' ? unitTypes.indexOf(selection.value.type) : -1;

  const selectTile = (i: number) => {
    onSelectionChange?.({
      type: 'tile',
      value: {
        type: tileTypes[i],
        player: selection.value.player,
        variation: 0,
      },
    });
  };

  const selectUnit = (i: number) => {
    onSelectionChange?.({
      type: 'unit',
      value: {
        type: unitTypes[i],
        player: selection.value.player,
      },
    });
  };

  const updateNation = (i: number) => {
    onSelectionChange?.(
      produce(selection, (draft) => {
        draft.value.player = i;
      }),
    );
  };

  return (
    <div>
      <p>
        {nationNames.map((nation, i) => (
          <img
            key={i}
            onClick={() => updateNation(i)}
            alt=""
            className={cls({
              [classes.selected]: selectedPlayer === i,
              [classes.tile]: true,
              pixelated: true,
            })}
            src={nations[nation]}
            draggable={false}
          />
        ))}
      </p>
      <p>
        {tileTypes.map((tileType, i) => (
          <img
            key={i}
            onClick={() => selectTile(i)}
            alt=""
            className={cls({
              [classes.selected]: selectedTileType === i,
              [classes.tile]: true,
              pixelated: true,
            })}
            src={getTileImage({
              type: tileType,
              player: selectedPlayer,
              variation: 0,
            })}
            draggable={false}
          />
        ))}
      </p>
      <p>
        {unitTypes.map((unitType, i) => (
          <img
            key={i}
            onClick={() => selectUnit(i)}
            alt=""
            className={cls({
              [classes.selected]: selectedUnitType === i,
              [classes.tile]: true,
              pixelated: true,
            })}
            src={getUnitImage({
              type: unitType,
              player: selectedPlayer,
            })}
            draggable={false}
          />
        ))}
      </p>
    </div>
  );
}
