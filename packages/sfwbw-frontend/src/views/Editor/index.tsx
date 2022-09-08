import produce from 'immer';
import { useState } from 'react';
import { Pallette } from '../../components/Palette';
import { Nation, Terrain, Tile } from '@sfwbw/sfwbw-core';
import { getTileImage } from '../../game/assets';
import { repeat, saveFile } from '../../utils';

import styles from './styles.module.css';

function createBoard(size: { width: number, height: number }): Tile[][] {
  return repeat(size.height, repeat(size.width, { type: Terrain.PLAINS, nation: Nation.NEUTRAL }));
}

export function Editor() {
  const [height, setHeight] = useState(9);
  const [width, setWidth] = useState(15);
  const [name, setName] = useState('untitled');
  const [board, setBoard] = useState<Tile[][]>(() => createBoard({ height, width }));

  const [selectedTile, setSelectedTile] = useState<Tile>({
    type: Terrain.PLAINS,
    nation: Nation.NEUTRAL,
  });

  const updateBoard = (y: number, x: number, newTile: Tile) => {
    setBoard(produce(draft => {
      draft[y][x] = newTile;
    }));
  };

  const saveMap = () => {
    const data = {
      name,
      width: board[0].length,
      height: board.length,
      board,
    };

    const rawData = JSON.stringify(data, null, 2);
    saveFile(`${name}.sfw-map.json`, rawData);
  };

  const cssVariables = {
    '--rows': String(board.length),
    '--columns': String(board[0].length),
    '--tile-size': '32px',
  };

  return (
    <main className={styles.editor}>
      <h2>Map Editor</h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          saveMap();
        }}
      >
        <p>
          <label htmlFor="editor-width">Width</label>
          <input
            type="number"
            name="editor-width"
            id="editor-width"
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
          />
        </p>

        <p>
          <label htmlFor="editor-height">Height</label>
          <input
            type="number"
            name="editor-height"
            id="editor-height"
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
          />
        </p>

        <p>
          <label htmlFor="editor-name">Name</label>
          <input
            type="text"
            name="editor-name"
            id="editor-name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </p>

        <p>
          <button type="submit">Save</button>
          &nbsp;
          <button
            type="button"
            onClick={() => {
              setBoard(createBoard({ width, height }));
            }}
          >
            Reset
          </button>
        </p>
      </form>

      <hr />

      <Pallette
        tile={selectedTile}
        onTileChange={setSelectedTile}
      ></Pallette>

      <div className={styles.editorMap} style={cssVariables as any}>
        {
          board.map((row, y) => (
            row.map((tile, x) => (
              <img
                key={`${y}-${x}`}
                onMouseDown={() => updateBoard(y, x, selectedTile)}
                onMouseOver={event => {
                  if (event.buttons === 1) {
                    updateBoard(y, x, selectedTile);
                  }
                }}
                src={getTileImage(tile)}
                draggable={false}
              />
            ))
          ))
        }
      </div>
    </main>
  );
}