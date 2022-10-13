import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormButton } from '../../../components/forms/FormButton';
import {
  QuerySearchForm,
  useSearchTerm,
} from '../../../components/forms/SearchForm/query';
import { MiniMap } from '../../../components/MiniMap';
import { User } from '../../../store/api';
import {
  DesignMap,
  useDeleteMapMutation,
  useSearchMapsQuery,
} from '../../../store/api/design-map';
import { useCurrentUser } from '../../../store/authSlice';
import { cls } from '../../../utils';
import { MaybeDeleted } from '../../../utils/deleted';

export function BrowseMaps() {
  const searchTerm = useSearchTerm();
  const user = useCurrentUser();

  const [designMaps, setDesignMaps] = useState<MaybeDeleted<DesignMap>[]>([]);

  const searchMapsResult = useSearchMapsQuery(searchTerm || '', {
    refetchOnMountOrArgChange: true,
  });

  const [deleteMap, deleteMapResult] = useDeleteMapMutation();

  useEffect(() => {
    if (searchMapsResult.isSuccess) {
      setDesignMaps(searchMapsResult.data);
    }
  }, [searchMapsResult]);

  useEffect(() => {
    if (deleteMapResult.isSuccess) {
      const id = deleteMapResult.data.id;
      setDesignMaps((maps) =>
        maps.map((map) => {
          if (map.id !== id) {
            return map;
          } else {
            return { ...map, deleted: true };
          }
        }),
      );
    }
  }, [deleteMapResult]);

  return (
    <>
      <QuerySearchForm isLoading={false} />
      <div>
        {searchMapsResult.isSuccess &&
          designMaps.map((designMap) => (
            <MapPreview
              key={designMap.id}
              user={user}
              designMap={designMap}
              onDelete={() => {
                if (window.confirm('Are you sure?')) {
                  deleteMap(designMap.id);
                }
              }}
              isDeleteLoading={deleteMapResult.isLoading}
            />
          ))}
      </div>
    </>
  );
}

interface Props {
  user: User | null;
  designMap: MaybeDeleted<DesignMap>;
  onDelete?: () => void;
  isDeleteLoading?: boolean;
}

export function MapPreview(props: Props) {
  const deleted = props.designMap.deleted;

  return (
    <article style={{ opacity: deleted ? '0.5' : '1' }}>
      <h5>{props.designMap.name}</h5>
      <div className="flex gap-4 md:gap-8">
        <MiniMap tiles={props.designMap.tiles} />
        <div>
          <div>Author: {props.designMap.author.username}</div>
          <div>Players: {props.designMap.maxPlayers}</div>
          <div>
            Size: {props.designMap.rows} x {props.designMap.columns}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Link
          role="button"
          to={`/games/new?map=${props.designMap.id}`}
          className={cls('m-0 py-2', { disabled: deleted })}
        >
          New Game
        </Link>
        {props.user?.username === props.designMap.author.username && (
          <>
            <Link
              role="button"
              to={`/maps/@${props.designMap.id}/edit`}
              className={cls('m-0 py-2', { disabled: deleted })}
            >
              Edit
            </Link>
            <FormButton
              className="m-0 py-2 bg-default-bg text-normal border border-solid border-default-border"
              disabled={deleted}
              onClick={props.onDelete}
              isLoading={props.isDeleteLoading}
            >
              Delete
            </FormButton>
          </>
        )}
      </div>
    </article>
  );
}
