import { Terrain, PLAYER_NEUTRAL, Tile } from '@sfwbw/sfwbw-core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pallette } from '../../../components/Palette';
import { getTileImage } from '../../../game/assets';
import { DesignMap, useGetMapByIdQuery } from '../../../store/api';
import { useCurrentUser } from '../../../store/auth-slice';
import produce from 'immer';

export function EditMap() {
  const navigate = useNavigate();
  const user = useCurrentUser({ requiresAuth: true });
  const { id } = useParams();

  const designMapResult = useGetMapByIdQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  const [designMap, setDesignMap] = useState<DesignMap>();

  useEffect(() => {
    if (user && designMapResult.isSuccess) {
      if (user.username !== designMapResult.data.author.username) {
        navigate('..');
      }

      setDesignMap(designMapResult.data);
    }
  }, [navigate, user, designMapResult]);

  const [selectedTile, setSelectedTile] = useState<Tile>({
    type: Terrain.PLAINS,
    player: PLAYER_NEUTRAL,
    variation: 0,
  });

  const updateBoard = (pos: { x: number; y: number }, newTile: Tile) => {
    setDesignMap(
      produce((draft) => {
        if (draft) {
          draft.tiles[pos.y][pos.x] = newTile;
        }
      }),
    );
  };

  return (
    <>
      <p>Edit Map {id}</p>

      <Pallette tile={selectedTile} onTileChange={setSelectedTile} />

      {designMap && (
        <>
          <p>{designMap.name}</p>

          <div className="w-fit m-auto">
            {designMap.tiles.map((row, y) => (
              <div className="flex select-none" key={y}>
                {row.map((tile, x) => (
                  <img
                    key={x}
                    src={getTileImage(tile)}
                    onMouseDown={() => updateBoard({ x, y }, selectedTile)}
                    onMouseOver={(event) => {
                      if (event.buttons === 1) {
                        updateBoard({ x, y }, selectedTile);
                      }
                    }}
                    alt=""
                    width="32"
                    height="32"
                    className="pixelated select-none"
                    draggable={false}
                  />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
