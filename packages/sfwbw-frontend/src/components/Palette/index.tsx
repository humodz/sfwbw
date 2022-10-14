import { nations } from '@sfwbw/sfwbw-assets';
import { Building, Nation, Terrain, Tile } from '@sfwbw/sfwbw-core';
import { getTileImage } from '../../game/assets';
import { cls } from '../../utils/css';

interface PaletteProps {
  tile: Tile;
  onTileChange?: (tile: Tile) => void;
}

const tileTypes = [...Object.values(Terrain), ...Object.values(Building)];

const nationNames = Object.values(Nation);

const classes = {
  tile: 'w-[36px] h-[36px] border-2 border-solid border-transparent select-none',
  selected: '!border-white',
};

export function Pallette({ tile, onTileChange }: PaletteProps) {
  const selectedTileType = tileTypes.indexOf(tile.type);
  const selectedPlayer = tile.player;

  const updateTileType = (i: number) => {
    onTileChange?.({
      type: tileTypes[i],
      player: tile.player,
      variation: 0,
    });
  };

  const updateNation = (i: number) => {
    onTileChange?.({
      type: tile.type,
      player: i,
      variation: 0,
    });
  };

  return (
    <div>
      <p>
        {tileTypes.map((tileType, i) => (
          <img
            key={i}
            onClick={() => updateTileType(i)}
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
    </div>
  );
}
