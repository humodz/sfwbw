import styles from './styles.module.css';

import React, { useEffect, useState } from 'react';
import { FormButton } from '../../components/forms/FormButton';
import {
  useDeleteGameMutation,
  useJoinGameMutation,
  useLeaveGameMutation,
  useListGamesQuery,
  useUpdatePlayerMutation,
} from '../../store/apiSlice';
import { useCurrentUser } from '../../store/hooks';
import { If } from '../../utils/jsx-conditionals';

import { GamePreview } from '../../components/GamePreview';
import { Game } from '../../store/apiSlice/models';
import { Deleted, isDeleted, MaybeDeleted } from '../../utils/deleted';

export function Home() {
  const [games, setGames] = useState<MaybeDeleted<Game>[]>([]);

  const user = useCurrentUser();

  const listGamesResult = useListGamesQuery({});
  const [joinGame, joinGameResult] = useJoinGameMutation();
  useUpdateGame(setGames, joinGameResult);

  const [leaveGame, leaveGameResult] = useLeaveGameMutation();
  useUpdateGame(setGames, leaveGameResult);

  const [deleteGame, deleteGameResult] = useDeleteGameMutation();
  useUpdateGame(setGames, deleteGameResult);

  const [updatePlayer, updatePlayerResult] = useUpdatePlayerMutation();
  useUpdateGame(setGames, updatePlayerResult);

  useEffect(() => {
    if (listGamesResult.isSuccess) {
      setGames(listGamesResult.data);
    }
  }, [listGamesResult]);

  return (
    <main>
      <SearchGamesForm />
      <div className={styles.gamesList}>
        {If(listGamesResult.isSuccess) &&
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
    </main>
  );
}

function SearchGamesForm() {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={styles.searchGames} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search games..."
        className={styles.searchQuery}
      ></input>
      <div className={styles.searchGamesButtons}>
        <FormButton type="submit">Search</FormButton>
        <FormButton type="button">New Game</FormButton>
      </div>
    </form>
  );
}

function useUpdateGame(
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
