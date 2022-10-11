import { Link } from 'react-router-dom';
import {
  ControlledSearchForm,
  useSearchTerm,
} from '../../../components/forms/SearchForm/controlled';
import { MiniMap } from '../../../components/MiniMap';
import { User } from '../../../store/api';
import { DesignMap, useSearchMapsQuery } from '../../../store/api/design-map';
import { useCurrentUser } from '../../../store/authSlice';

export function BrowseMaps() {
  const searchTerm = useSearchTerm();
  const user = useCurrentUser();

  const searchMapsResult = useSearchMapsQuery(searchTerm || '');

  return (
    <>
      <ControlledSearchForm isLoading={false} />
      <div>
        {searchMapsResult.isSuccess &&
          searchMapsResult.data.map((designMap) => (
            <MapPreview key={designMap.id} user={user} designMap={designMap} />
          ))}
      </div>
    </>
  );
}

interface Props {
  user: User | null;
  designMap: DesignMap;
  onDelete: () => void;
}

export function MapPreview(props: Props) {
  return (
    <article>
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
        <Link role="button" to="/games/new" className="m-0 py-2">
          New Game
        </Link>
        {props.user?.username === props.designMap.author.username && (
          <>
            <Link
              role="button"
              to={`/maps/@${props.designMap.id}`}
              className="m-0 py-2"
            >
              Edit
            </Link>
            <button
              className="m-0 py-2 bg-default-bg text-normal border border-solid border-default-border"
              onClick={props.onDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
}
