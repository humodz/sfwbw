import { Terrain, PLAYER_NEUTRAL, Tile } from '@sfwbw/sfwbw-core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaletteSelection, Pallette } from '../../../components/Palette';
import { getTileImage, getUnitImage } from '../../../game/assets';
import {
  DesignMap,
  useGetMapByIdQuery,
  useUpdateMapMutation,
} from '../../../store/api';
import { useCurrentUser } from '../../../store/auth-slice';
import produce from 'immer';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { FormField } from '../../../components/forms/FormField';
import { FormButton } from '../../../components/forms/FormButton';

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

  const [selection, setSelection] = useState<PaletteSelection>({
    type: 'tile',
    value: {
      type: Terrain.PLAINS,
      player: PLAYER_NEUTRAL,
      variation: 0,
    },
  });

  const updateName = (newName: string) => {
    setDesignMap(
      produce((draft) => {
        if (draft) {
          draft.name = newName;
        }
      }),
    );
  };

  const updateMapData = (
    pos: { x: number; y: number },
    selection: PaletteSelection,
  ) => {
    setDesignMap(
      produce((draft) => {
        if (draft) {
          if (selection.type === 'tile') {
            draft.tiles[pos.y][pos.x] = selection.value;
          } else {
            const coord = `${pos.x},${pos.y}`;

            const oldUnit = draft.units[coord];
            const newUnit = selection.value;

            if (
              oldUnit &&
              oldUnit.type === newUnit.type &&
              oldUnit.player === newUnit.player
            ) {
              delete draft.units[coord];
            } else {
              draft.units = {
                ...draft.units,
                [coord]: selection.value,
              };
            }
          }
        }
      }),
    );
  };

  const [updateMap, updateMapResult] = useUpdateMapMutation();

  const saveMap = () => {
    if (designMap) {
      const { name, tiles, units } = designMap;
      updateMap({
        id: designMap.id,
        data: { name, tiles, units },
      });
    }
  };

  return (
    <>
      {designMap && (
        <>
          <FormField
            id={'editmap-name'}
            label="Name"
            value={designMap.name}
            setValue={updateName}
          />
          <FormButton
            type="button"
            className="block mx-auto min-w-[50%]"
            isLoading={updateMapResult.isLoading}
            onClick={saveMap}
          >
            Save
          </FormButton>

          <hr />
          <Pallette selection={selection} onSelectionChange={setSelection} />
          <div className="w-fit m-auto">
            {designMap.tiles.map((row, y) => (
              <div className="flex select-none" key={y}>
                {row.map((tile, x) => (
                  <div
                    key={x}
                    className="pixelated select-none"
                    onMouseDown={() => updateMapData({ x, y }, selection)}
                    onMouseOver={(event) => {
                      if (event.buttons === 1) {
                        updateMapData({ x, y }, selection);
                      }
                    }}
                    style={{
                      backgroundImage: `url(${getTileImage(tile)}`,
                      backgroundSize: 'cover',
                      width: '32px',
                      height: '32px',
                    }}
                  >
                    {designMap.units[`${x},${y}`] && (
                      <img
                        src={getUnitImage(designMap.units[`${x},${y}`])}
                        alt=""
                        className="pixelated select-none pointer-events-none"
                        width="32"
                        height="32"
                        draggable="false"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
      {designMapResult.isError && (
        <ErrorMessage error={designMapResult.error} />
      )}
      {updateMapResult.isError && (
        <ErrorMessage error={updateMapResult.error} />
      )}
    </>
  );
}
