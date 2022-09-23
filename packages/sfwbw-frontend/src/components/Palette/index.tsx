import { nations } from '@sfwbw/sfwbw-assets';
import { Building, Nation, Terrain, Tile } from '@sfwbw/sfwbw-core';
import { getTileImage } from '../../game/assets';
import { cls } from '../../utils';

import styles from './styles.module.css';

interface PaletteProps {
  tile: Tile;
  onTileChange?: (tile: Tile) => void;
}

const tileTypes = [...Object.values(Terrain), ...Object.values(Building)];

const nationNames = Object.values(Nation);

export function Pallette({ tile, onTileChange }: PaletteProps) {
  const selectedTileType = tileTypes.indexOf(tile.type);
  const selectedPlayer = tile.player;

  const updateTileType = (i: number) => {
    onTileChange?.({
      type: tileTypes[i],
      player: tile.player,
    });
  };

  const updateNation = (i: number) => {
    onTileChange?.({
      type: tile.type,
      player: i,
    });
  };

  return (
    <div className={styles.editorPalette}>
      <p>
        {tileTypes.map((tileType, i) => (
          <img
            key={i}
            onClick={() => updateTileType(i)}
            alt=""
            className={cls({
              [styles.selected]: selectedTileType === i,
            })}
            src={getTileImage({ type: tileType, player: selectedPlayer })}
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
              [styles.selected]: selectedPlayer === i,
            })}
            src={nations[nation]}
            draggable={false}
          />
        ))}
      </p>
    </div>
  );
}
