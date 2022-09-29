import { Tile, TileType } from './types';

const tileTypes = Object.values(TileType);

export function serializeTiles(tiles: Tile[][]) {
  return tiles.map(row =>
    row.map(cell => {
      const tileType = (tileTypes.indexOf(cell.type) + 1).toString(16).padStart(2, '0');
      const player = cell.player.toString(16);
      return tileType + player;
    }).join('')
  ).join('|');
}

export function deserializeTiles(text: string): Tile[][] {
  const cellRegExp = /.{3}/g;

  return text.split('|').map(row => {
    const cells = row.match(cellRegExp);

    if (!cells) {
      throw new Error('Cannot deserialize tiles');
    }

    return cells.map(cell => {
      const tileTypeIndex = parseInt(cell.slice(0, 2), 16) - 1;
      const player = parseInt(cell[2], 16);

      return {
        type: tileTypes[tileTypeIndex],
        player,
      };
    })
  });
}