import { Tile, TileType } from './types';

const tileTypes = Object.values(TileType);

export function serializeTiles(tiles: Tile[][]) {
  return tiles
    .map((row) =>
      row
        .map((tile) => {
          const tileType = (tileTypes.indexOf(tile.type) + 1)
            .toString(16)
            .padStart(2, '0');
          const player = tile.player.toString(16);
          const variation = tile.variation.toString(16);
          return tileType + player + variation;
        })
        .join(''),
    )
    .join('|');
}

export function deserializeTiles(text: string): Tile[][] {
  const cellRegExp = /.{4}/g;

  return text.split('|').map((row) => {
    const cells = row.match(cellRegExp);

    if (!cells) {
      throw new Error('Cannot deserialize tiles');
    }

    return cells.map((cell) => {
      const tileTypeIndex = parseInt(cell.slice(0, 2), 16) - 1;
      const player = parseInt(cell[2], 16);
      const variation = parseInt(cell[3], 16);

      return {
        type: tileTypes[tileTypeIndex],
        player,
        variation,
      };
    });
  });
}
