import styles from './styles.module.css';

import { tilePreviews } from '@sfwbw/sfwbw-assets';
import { isTerrain, Terrain, Tile } from '@sfwbw/sfwbw-core';
import React from 'react';
import { cssVars } from '../../../utils';

interface MapPreviewProps {
  tiles: Tile[][];
}

export const MapPreview = React.memo(MapPreviewOriginal);

function MapPreviewOriginal(props: MapPreviewProps) {
  const rows = props.tiles.length;
  const columns = props.tiles[0].length;

  const mapPreviewVars = cssVars({
    '--tile-previews': `url(${tilePreviews}`,
    '--rows': rows,
    '--columns': columns,
  });

  return (
    <div className={styles.mapPreview} style={mapPreviewVars}>
      {props.tiles.flatMap((row, y) =>
        row.map((tile, x) => (
          <div
            key={`${y}-${x}`}
            style={{
              backgroundPosition: getBackgroundPosition(tile),
            }}
          ></div>
        )),
      )}
    </div>
  );
}

const terrainValues = Object.values(Terrain);

function getBackgroundPosition(tile: Tile) {
  if (isTerrain(tile.type)) {
    const index = terrainValues.indexOf(tile.type);

    return `calc(${index} * -100%) 0`;
  } else {
    return `calc(${tile.player} * -100%) 100%`;
  }
}
