import { useEffect, useState } from 'react';
import {
  QuerySearchForm,
  useSearchTerm,
} from '../../../components/forms/SearchForm/query';
import { Loader } from '../../../components/Loader';
import { MapPreview } from '../../../components/MapPreview';
import {
  DesignMap,
  useDeleteMapMutation,
  useSearchMapsQuery,
} from '../../../store/api/design-map';
import { useCurrentUser } from '../../../store/auth-slice';
import { MaybeDeleted } from '../../../utils/deleted';

interface BrowseMapsProps {
  mode: 'all' | 'my-maps';
}

export function BrowseMaps(props: BrowseMapsProps) {
  const searchTerm = useSearchTerm();
  const user = useCurrentUser({ requiresAuth: props.mode !== 'all' });

  const [designMaps, setDesignMaps] = useState<MaybeDeleted<DesignMap>[]>([]);

  const searchParams = {
    search: searchTerm,
    author: props.mode === 'all' ? undefined : user?.username,
  };

  const searchMapsResult = useSearchMapsQuery(searchParams, {
    skip: props.mode === 'my-maps' && !user,
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
        <Loader
          query={searchMapsResult}
          view={() =>
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
            ))
          }
        />
      </div>
    </>
  );
}
