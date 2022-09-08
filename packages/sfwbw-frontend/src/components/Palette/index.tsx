import { nations } from '@sfwbw/sfwbw-assets';
import { Building, Nation, Terrain, Tile } from '../../game';
import { getTileImage } from '../../game/assets';
import { cls } from '../../utils';

import styles from './styles.module.css';

interface PaletteProps {
  tile: Tile;
  onTileChange?: (tile: Tile) => void
}

const tileTypes = [
  ...Object.values(Terrain),
  ...Object.values(Building),
];

const nationNames = Object.values(Nation);

export function Pallette({ tile, onTileChange }: PaletteProps) {
  const selectedTileType = tileTypes.indexOf(tile.type);
  const selectedNation = nationNames.indexOf(tile.nation);

  const updateTileType = (i: number) => {
    onTileChange?.({
      type: tileTypes[i],
      nation: tile.nation,
    });
  };

  const updateNation = (i: number) => {
    onTileChange?.({
      type: tile.type,
      nation: nationNames[i],
    });
  };

  return (
    <div className={styles.editorPalette}>
      <p>
        {
          tileTypes.map((tileType, i) => (
            <img
              key={i}
              onClick={() => updateTileType(i)}
              className={cls({
                [styles.selected]: selectedTileType === i,
              })}
              src={getTileImage({ type: tileType, nation: nationNames[selectedNation] })}
              draggable={false}
            />
          ))
        }
      </p>

      <p>
        {
          nationNames.map((nation, i) => (
            <img
              key={i}
              onClick={() => updateNation(i)}
              className={cls({
                [styles.selected]: selectedNation === i,
              })}
              src={nations[nation]}
              draggable={false}
            />
          ))
        }
      </p>

    </div>
  );
}