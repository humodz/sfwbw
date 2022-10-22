import {
  PLAYER_NEUTRAL,
  Point,
  pointToString,
  Terrain,
  Tile,
} from '@sfwbw/sfwbw-core';
import produce from 'immer';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { FormButton } from '../../../components/forms/FormButton';
import { FormField } from '../../../components/forms/FormField';
import { PaletteSelection, Pallette } from '../../../components/Palette';
import { getTileImage, getUnitImage } from '../../../game/assets';
import {
  DesignMap,
  useGetMapByIdQuery,
  useUpdateMapMutation,
} from '../../../store/api';
import { useCurrentUser } from '../../../store/auth-slice';

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
    pos: Point,
    selection: PaletteSelection,
    mode: 'click' | 'drag',
  ) => {
    setDesignMap(
      produce((draft) => {
        if (draft) {
          if (selection.type === 'tile') {
            draft.tiles[pos.y][pos.x] = selection.value;
          } else if (mode === 'click') {
            const oldUnit = draft.units[pointToString(pos)];

            const newUnit = {
              ...selection.value,
              pos,
            };

            if (
              oldUnit &&
              oldUnit.type === newUnit.type &&
              oldUnit.player === newUnit.player
            ) {
              delete draft.units[pointToString(pos)];
            } else {
              draft.units[pointToString(pos)] = newUnit;
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
                  <EditorTile
                    key={x}
                    tile={tile}
                    onMouseDown={() =>
                      updateMapData({ x, y }, selection, 'click')
                    }
                    onMouseDrag={() =>
                      updateMapData({ x, y }, selection, 'drag')
                    }
                  >
                    <EditorUnit units={designMap.units} pos={{ x, y }} />
                  </EditorTile>
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

interface EditorTileProps {
  tile: Tile;
  children?: ReactNode;
  onMouseDown?: () => void;
  onMouseDrag?: () => void;
}

function EditorTile(props: EditorTileProps) {
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

interface UnitImageProps {
  units: DesignMap['units'];
  pos: Point;
}

function EditorUnit(props: UnitImageProps) {
  const unit = props.units[pointToString(props.pos)];

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
