import styles from './styles.module.css';

import { tilePreviews } from '@sfwbw/sfwbw-assets';
import { isTerrain, Terrain, Tile } from '@sfwbw/sfwbw-core';
import React from 'react';
import { cssVars } from '../../utils';

interface Props {
  tiles: Tile[][];
}

export const MiniMap = React.memo(MiniMapOriginal);

const tileSize = 4;

function MiniMapOriginal(props: Props) {
  const rows = props.tiles.length;
  const columns = props.tiles[0].length;

  const miniMapVars = cssVars({
    '--rows': rows,
    '--columns': columns,
  });

  const drawMiniMap = async (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      return;
    }

    const tilesImage = await loadImage(tilePreviews);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    props.tiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        const px = tileSize * x;
        const py = tileSize * y;

        const [srcX, srcY] = getTilePosition(tile);

        ctx.drawImage(
          tilesImage,
          srcX,
          srcY,
          tileSize,
          tileSize,
          px,
          py,
          tileSize,
          tileSize,
        );
      });
    });
  };

  return (
    <div style={{ width: '6rem' }}>
      <canvas
        ref={drawMiniMap}
        className={`${styles.miniMap} pixelated m-auto block`}
        style={miniMapVars}
        width={tileSize * columns}
        height={tileSize * rows}
      />
    </div>
  );
}

async function loadImage(src: string) {
  const img = document.createElement('img');
  img.src = tilePreviews;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
  });

  return img;
}

const terrainValues = Object.values(Terrain);

function getTilePosition(tile: Tile): [number, number] {
  if (isTerrain(tile.type)) {
    const index = terrainValues.indexOf(tile.type);
    return [index * tileSize, 0];
  } else {
    return [tile.player * tileSize, tileSize];
  }
}
