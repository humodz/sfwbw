import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTileImage } from '../../../game/assets';
import { DesignMap, useGetMapByIdQuery } from '../../../store/api';

export function EditMap() {
  const { id } = useParams();

  const designMapResult = useGetMapByIdQuery(Number(id));

  const [designMap, setDesignMap] = useState<DesignMap>();

  useEffect(() => {
    if (designMapResult.isSuccess) {
      setDesignMap(designMapResult.data);
    }
  }, [designMapResult]);

  return (
    <>
      <p>Edit Map {id}</p>

      {designMap && (
        <>
          <p>{designMap.name}</p>

          <div className="w-fit m-auto">
            {designMap.tiles.map((row) => (
              <div className="flex">
                {row.map((tile) => (
                  <img
                    src={getTileImage(tile)}
                    alt=""
                    width="32"
                    height="32"
                    className="pixelated"
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
