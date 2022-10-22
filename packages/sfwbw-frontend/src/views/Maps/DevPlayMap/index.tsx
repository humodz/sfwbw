import {
  createGame,
  Game,
  getCurrentPlayer,
  isCurrentPlayer,
  nextTurn,
  Point,
  pointEquals,
  Tile,
} from '@sfwbw/sfwbw-core';
import { unitData } from '@sfwbw/sfwbw-core/src/game/data/units';
import {
  getAvailableUnits,
  getFactoryUnits,
  isFactory,
} from '@sfwbw/sfwbw-core/src/game/factory';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTileImage, getUnitImage } from '../../../game/assets';
import { useGetMapByIdQuery } from '../../../store/api';

function maybe<T>(
  fn: (value: T) => T,
): (value: T | undefined) => T | undefined {
  return (value) => (value ? fn(value) : value);
}

interface SideBarOption {
  label: string;
  disabled: boolean;
  action: () => void;
}

export function DevPlayMap() {
  const { id } = useParams();

  const designMapResult = useGetMapByIdQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  const designMap = designMapResult.data;

  const [game, setGame] = useState<Game>();

  const [options, setOptions] = useState<SideBarOption[]>();

  useEffect(() => {
    if (designMap && !game) {
      const newGame = createGame(
        designMap.tiles,
        Object.values(designMap.units),
      );
      setGame(nextTurn(newGame));
    }
  }, [game, designMap]);

  const onClickTile = (tile: Tile, pos: Point) => {
    if (!game) {
      return;
    }

    if (isFactory(tile.type) && isCurrentPlayer(game, tile.player)) {
      const player = getCurrentPlayer(game);
      const units = getFactoryUnits(tile.type);
      const availableUnits = getAvailableUnits(player, tile.type);

      setOptions(
        units.map((unitType) => {
          const unit = unitData[unitType];

          return {
            label: `${unit.name} - ${unit.cost}`,
            disabled: !availableUnits.includes(unitType),
            action: () => console.log('wip'),
          };
        }),
      );
    } else {
      setOptions(undefined);
    }
  };

  if (!designMap || !game) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        {game.players.map((player, i) => (
          <div
            key={i}
            className={game.currentPlayerIndex === i ? 'font-bold' : ''}
          >
            Player {i}: ${player.funds}
          </div>
        ))}
        <button onClick={() => setGame(maybe(nextTurn))}>End Turn</button>
      </div>
      <div className="flex select-none">
        {options && (
          <div>
            {options.map((option, i) => (
              <div
                key={i}
                className={option.disabled ? 'opacity-50' : ''}
                onClick={() => {
                  if (!option.disabled) {
                    option.action();
                  }
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        <div className="w-fit m-auto">
          {game.tiles.map((row, y) => (
            <div className="flex select-none" key={y}>
              {row.map((tile, x) => (
                <GameTile
                  tile={tile}
                  key={x}
                  onClick={() => onClickTile(tile, { x, y })}
                >
                  <GameUnit units={game.units} pos={{ x, y }}></GameUnit>
                </GameTile>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface GameTileProps {
  tile: Tile;
  children?: ReactNode;
  onClick?: () => void;
}

function GameTile(props: GameTileProps) {
  return (
    <div
      className="pixelated select-none bg-cover w-[32px] h-[32px]"
      onClick={props.onClick}
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
