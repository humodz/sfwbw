import { Link } from 'react-router-dom';
import { User, DesignMap } from '../../store/api';
import { cls } from '../../utils/css';
import { MaybeDeleted } from '../../utils/deleted';
import { FormButton } from '../forms/FormButton';
import { MiniMap } from '../MiniMap';

interface MapPreviewProps {
  user: User | null;
  designMap: MaybeDeleted<DesignMap>;
  onDelete?: () => void;
  isDeleteLoading?: boolean;
}

export function MapPreview(props: MapPreviewProps) {
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
