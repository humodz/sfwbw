import styles from './styles.module.css';

import React, { useEffect, useState } from 'react';
import { FormButton } from '../../components/forms/FormButton';
import {
  useDeleteGameMutation,
  useJoinGameMutation,
  useLazySearchGamesQuery,
  useLeaveGameMutation,
  useUpdatePlayerMutation,
} from '../../store/apiSlice';
import { useCurrentUser } from '../../store/hooks';
import { If } from '../../utils/jsx-conditionals';

import { Link } from 'react-router-dom';
import { GamePreview } from '../../components/GamePreview';
import { Game } from '../../store/apiSlice/models';
import { Deleted, isDeleted, MaybeDeleted } from '../../utils/deleted';

export function Home() {
  const user = useCurrentUser();

  const [games, setGames] = useState<MaybeDeleted<Game>[]>([]);
  const [searchGames, searchGamesResult] = useLazySearchGamesQuery();

  useEffect(() => {
    searchGames('');
  }, [searchGames]);

  useEffect(() => {
    const games = searchGamesResult.data;

    if (games) {
      setGames(games);
    }
  }, [searchGamesResult.data]);

  const [joinGame, joinGameResult] = useJoinGameMutation();
  useUpdateGamesList(setGames, joinGameResult);

  const [leaveGame, leaveGameResult] = useLeaveGameMutation();
  useUpdateGamesList(setGames, leaveGameResult);

  const [deleteGame, deleteGameResult] = useDeleteGameMutation();
  useUpdateGamesList(setGames, deleteGameResult);

  const [updatePlayer, updatePlayerResult] = useUpdatePlayerMutation();
  useUpdateGamesList(setGames, updatePlayerResult);

  return (
    <main>
      <SearchGamesForm
        loading={searchGamesResult.isFetching}
        onSearch={(searchTerm) => searchGames(searchTerm)}
      />
      <div className={styles.gamesList}>
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
    </main>
  );
}

interface SearchGamesFormProps {
  disabled?: boolean;
  loading?: boolean;
  onSearch?: (searchTerm: string) => void;
}

function SearchGamesForm(props: SearchGamesFormProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSearch?.(searchTerm);
  };

  return (
    <form className={styles.searchGames} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search games..."
        className={styles.searchQuery}
        disabled={props.disabled}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className={styles.searchGamesButtons}>
        <FormButton type="submit" loading={props.loading}>
          Search
        </FormButton>
        <Link to="/new-game" role="button">
          New Game
        </Link>
      </div>
    </form>
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
