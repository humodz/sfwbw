import { useEffect, useState } from 'react';
import {
  ControlledSearchForm,
  useSearchTerm,
} from '../../../components/forms/SearchForm/controlled';
import { GamePreview } from '../../../components/GamePreview';
import {
  Game,
  useDeleteGameMutation,
  useJoinGameMutation,
  useLeaveGameMutation,
  useSearchGamesQuery,
  useUpdatePlayerMutation,
} from '../../../store/api';
import { useCurrentUser } from '../../../store/authSlice';
import { Deleted, isDeleted, MaybeDeleted } from '../../../utils/deleted';
import { useErrorPopup } from '../../../utils/errors';
import { If } from '../../../utils/jsxConditionals';

export function BrowseGames() {
  const searchTerm = useSearchTerm();
  const user = useCurrentUser();

  const [games, setGames] = useState<MaybeDeleted<Game>[]>([]);
  const searchGamesResult = useSearchGamesQuery(searchTerm || '');

  useEffect(() => {
    const games = searchGamesResult.data;

    if (games) {
      setGames(games);
    }
  }, [searchGamesResult.data]);

  const [joinGame, joinGameResult] = useJoinGameMutation();
  useUpdateGamesList(setGames, joinGameResult);
  useErrorPopup(joinGameResult);

  const [leaveGame, leaveGameResult] = useLeaveGameMutation();
  useUpdateGamesList(setGames, leaveGameResult);

  const [deleteGame, deleteGameResult] = useDeleteGameMutation();
  useUpdateGamesList(setGames, deleteGameResult);

  const [updatePlayer, updatePlayerResult] = useUpdatePlayerMutation();
  useUpdateGamesList(setGames, updatePlayerResult);

  return (
    <>
      <ControlledSearchForm isLoading={searchGamesResult.isFetching} />
      <div>
        {If(searchGamesResult.isSuccess) &&
          games.map((game) => (
            <GamePreview
              key={game.id}
              user={user}
              game={game}
              onJoin={(pwd) =>
                joinGame({ gameId: game.id, password: pwd || null })
              }
              onLeave={() => leaveGame({ gameId: game.id })}
              onDelete={() => deleteGame({ gameId: game.id })}
              onPlayerNationChange={(nation) =>
                updatePlayer({ gameId: game.id, nation })
              }
              onPlayerReadyChange={(ready) =>
                updatePlayer({ gameId: game.id, ready })
              }
            />
          ))}
        {If(searchGamesResult.isSuccess && games.length === 0) && (
          <p className="text-center mt-8">No games found.</p>
        )}
      </div>
    </>
  );
}

function useUpdateGamesList(
  setGames: (fn: (games: MaybeDeleted<Game>[]) => MaybeDeleted<Game>[]) => void,
  apiResult:
    | { isSuccess: true; data: Game | Deleted<number> }
    | { isSuccess: false },
) {
  useEffect(() => {
    if (apiResult.isSuccess) {
      const updatedGame = apiResult.data;
      setGames((games) =>
        games.map((game) => {
          if (game.id === updatedGame.id) {
            if (isDeleted(updatedGame)) {
              return { ...game, deleted: true };
            } else {
              return updatedGame;
            }
          } else {
            return game;
          }
        }),
      );
    }
  }, [setGames, apiResult]);
}
