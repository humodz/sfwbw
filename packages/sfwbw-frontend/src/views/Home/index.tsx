import styles from './styles.module.css';

import React, { useEffect, useMemo, useState } from 'react';
import { FormButton } from '../../components/forms/FormButton';
import {
  useDeleteGameMutation,
  useJoinGameMutation,
  useLeaveGameMutation,
  useSearchGamesQuery,
  useUpdatePlayerMutation,
} from '../../store/api';
import { useCurrentUser } from '../../store/hooks';
import { If } from '../../utils/jsx-conditionals';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GamePreview } from '../../components/GamePreview';
import { Game } from '../../store/api';
import { Deleted, isDeleted, MaybeDeleted } from '../../utils/deleted';

export function Home() {
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
    <main>
      <SearchGamesForm
        searchTerm={searchTerm || ''}
        loading={searchGamesResult.isFetching}
        onSearch={(searchTerm) => {
          navigate({ search: toQueryString({ q: searchTerm }) });
        }}
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
  searchTerm: string;
  onSearch?: (searchTerm: string) => void;
}

function SearchGamesForm(props: SearchGamesFormProps) {
  const [searchTerm, setSearchTerm] = useState(props.searchTerm || '');

  useEffect(() => {
    setSearchTerm(props.searchTerm);
  }, [props.searchTerm]);

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

function useErrorPopup(
  apiResult: { isError: true; error: any } | { isError: false },
) {
  useEffect(() => {
    if (apiResult.isError) {
      const message = apiResult.error.data?.message || 'Unknown error';
      alert(message);
    }
  }, [apiResult]);
}

function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => {
    const urlSearchParams = new URLSearchParams(search);

    const query: Record<string, string | undefined> = {};

    for (const key of urlSearchParams.keys()) {
      const value = urlSearchParams.get(key);

      if (value !== null) {
        query[key] = value;
      }
    }

    return query;
  }, [search]);
}

function toQueryString(query: Record<string, string>) {
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== null && value !== undefined) {
      urlSearchParams.set(key, value);
    }
  }

  return urlSearchParams.toString();
}
