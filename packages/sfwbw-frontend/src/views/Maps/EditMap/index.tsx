import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTileImage } from '../../../game/assets';
import { DesignMap, useGetMapByIdQuery } from '../../../store/api';
import { useCurrentUser } from '../../../store/authSlice';

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
