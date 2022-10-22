import {
  createGame,
  Game,
  Point,
  pointEquals,
  pointToString,
  Tile,
} from '@sfwbw/sfwbw-core';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTileImage, getUnitImage } from '../../../game/assets';
import { DesignMap, useGetMapByIdQuery } from '../../../store/api';

export function DevPlayMap() {
  const { id } = useParams();

  const designMapResult = useGetMapByIdQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  const designMap = designMapResult.data;

  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (designMap && !game) {
      setGame(createGame(designMap.tiles, Object.values(designMap.units)));
    }
  }, [game, designMap]);

  if (!designMap || !game) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="w-fit m-auto">
        {game.tiles.map((row, y) => (
          <div className="flex select-none" key={y}>
            {row.map((tile, x) => (
              <GameTile tile={tile} key={x}>
                <GameUnit units={game.units} pos={{ x, y }}></GameUnit>
              </GameTile>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface GameTileProps {
  tile: Tile;
  children?: ReactNode;
  onMouseDown?: () => void;
  onMouseDrag?: () => void;
}

function GameTile(props: GameTileProps) {
  return (
    <div
      className="pixelated select-none bg-cover w-[32px] h-[32px]"
      onMouseDown={() => props.onMouseDown?.()}
      onMouseOver={(event) => {
        if (event.buttons === 1) {
          props.onMouseDrag?.();
        }
      }}
      style={{
        backgroundImage: `url(${getTileImage(props.tile)}`,
      }}
    >
      {props.children}
    </div>
  );
}

interface GameUnitProps {
  units: Game['units'];
  pos: Point;
}

function GameUnit(props: GameUnitProps) {
  const unit = props.units.find((it) => pointEquals(it.pos, props.pos));

  if (!unit) {
    return null;
  }

  return (
    <img
      src={getUnitImage(unit)}
      alt=""
      className="pixelated select-none pointer-events-none"
      width="32"
      height="32"
      draggable="false"
    />
  );
}
