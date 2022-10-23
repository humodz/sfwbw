import {
  createGame,
  Game,
  getCurrentPlayer,
  isCurrentPlayer,
  nextTurn,
  Point,
  pointEquals,
  Tile,
  sorted,
  by,
  executeAction,
  ActionType,
  isOccupied,
} from '@sfwbw/sfwbw-core';
import { unitData } from '@sfwbw/sfwbw-core';
import {
  getAvailableUnits,
  getFactoryUnits,
  isFactory,
} from '@sfwbw/sfwbw-core';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTileImage, getUnitImage } from '../../../game/assets';
import { useGetMapByIdQuery } from '../../../store/api';
import { cls } from '../../../utils';

function maybe<T>(
  fn: (value: T) => T,
): (value: T | undefined) => T | undefined {
  return (value) => (value !== undefined ? fn(value) : value);
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

  const [game, setGameOptional] = useState<Game>();

  const setGame = (arg: Game | ((game: Game) => Game)) => {
    if (typeof arg === 'function') {
      setGameOptional(maybe(arg));
    } else {
      setGameOptional(arg);
    }
  };

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

    if (
      isFactory(tile.type) &&
      isCurrentPlayer(game, tile.player) &&
      !isOccupied(game, pos)
    ) {
      const player = getCurrentPlayer(game);
      const unitTypes = getFactoryUnits(tile.type);
      const availableUnitTypes = getAvailableUnits(player, tile.type);

      const units = unitTypes.map((type) => ({
        type,
        ...unitData[type],
      }));

      const sortedUnits = sorted(
        units,
        by((unit) => unit.cost),
      );

      setOptions(
        sortedUnits.map((unit) => {
          return {
            label: `${unit.name} - ${unit.cost}`,
            disabled: !availableUnitTypes.includes(unit.type),
            action: () => {
              setOptions([]);
              setGame((game) =>
                executeAction(game, {
                  type: ActionType.RECRUIT,
                  where: pos,
                  unit: unit.type,
                }),
              );
            },
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
        <button
          onClick={() => {
            setOptions([]);
            setGame(nextTurn);
          }}
        >
          End Turn
        </button>
      </div>
      <hr />
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
        <div className="w-fit ml-auto">
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
      className={cls({
        'pixelated select-none pointer-events-none': true,
        'brightness-50': !unit.ready,
      })}
      width="32"
      height="32"
      draggable="false"
    />
  );
}
