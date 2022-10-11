import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GamePreview } from '../../../components/GamePreview';
import { SearchGamesForm } from '../../../components/SearchGamesForm';
import {
  Game,
  useSearchGamesQuery,
  useJoinGameMutation,
  useLeaveGameMutation,
  useDeleteGameMutation,
  useUpdatePlayerMutation,
} from '../../../store/api';
import { useCurrentUser } from '../../../store/hooks';
import { Deleted, isDeleted, MaybeDeleted } from '../../../utils/deleted';
import { useErrorPopup } from '../../../utils/errors';
import { If } from '../../../utils/jsxConditionals';
import { useQueryParams, toQueryString } from '../../../utils/router';

export function BrowseGames() {
  const navigate = useNavigate();
  const { q: searchTerm } = useQueryParams();
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
      <SearchGamesForm
        searchTerm={searchTerm || ''}
        loading={searchGamesResult.isFetching}
        onSearch={(searchTerm) => {
          navigate({ search: toQueryString({ q: searchTerm }) });
        }}
      />
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
