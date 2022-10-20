import { useEffect, useState } from 'react';
import { ErrorMessage } from '../../../components/ErrorMessage';
import {
  QuerySearchForm,
  useSearchTerm,
} from '../../../components/forms/SearchForm/query';
import { GamePreview } from '../../../components/GamePreview';
import { Loader } from '../../../components/Loader';
import {
  Game,
  useDeleteGameMutation,
  useJoinGameMutation,
  useLeaveGameMutation,
  useSearchGamesQuery,
  useUpdatePlayerMutation,
} from '../../../store/api';
import { useCurrentUser } from '../../../store/auth-slice';
import { Deleted, isDeleted, MaybeDeleted } from '../../../utils';
import { useErrorPopup } from '../../../utils';

interface Props {
  mode: 'all' | 'my-games' | 'my-turn';
}

export function BrowseGames(props: Props) {
  const searchTerm = useSearchTerm();
  const user = useCurrentUser({ requiresAuth: props.mode !== 'all' });

  const searchParams = {
    search: searchTerm,
    player: props.mode === 'my-games' ? user?.username : undefined,
    turn: props.mode === 'my-turn' ? user?.username : undefined,
  };

  const searchGamesResult = useSearchGamesQuery(searchParams, {
    refetchOnMountOrArgChange: true,
  });

  const [games, setGames] = useState<MaybeDeleted<Game>[]>([]);

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
      <QuerySearchForm isLoading={searchGamesResult.isFetching} />
      <Loader
        query={searchGamesResult}
        view={() =>
          games.length > 0 ? (
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
            ))
          ) : (
            <p className="text-center mt-8">No games found.</p>
          )
        }
      />
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
