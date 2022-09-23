import styles from './styles.module.css';

import React, { useEffect, useState } from 'react';
import crown from '../../assets/icons/crown.png';
import { FormButton } from '../../components/forms/FormButton';
import { useListGamesQuery } from '../../store/apiSlice';
import { Game, Player, User } from '../../store/apiSlice/models';
import { useCurrentUser } from '../../store/hooks';
import { If } from '../../utils/jsx-conditionals';

export function Home() {
  const user = useCurrentUser();

  const { data, error, isSuccess } = useListGamesQuery({});
  const games = data?.games || [];

  useEffect(() => {
    console.log(games);
  }, [games]);

  return (
    <main>
      <SearchGamesForm />
      <section>
        {
          If(isSuccess) && (
            games.map(game => (
              <GamePreview key={game.id} user={user} game={game}/>
            ))
          )
        }
      </section>
    </main>
  );
}


interface GamePreviewProps {
  user: User | null;
  game: Game;
}

function GamePreview(props: GamePreviewProps) {
  return (
    <article>
      <h5>{props.game.name}</h5>
      <div style={{
        display: 'flex',
        columnGap: '0.5rem',
      }}>
        <div style={{
          backgroundColor: 'var(--accent-bg)',
          width: '10rem',
          height: '10rem',
        }}>
          map goes here
        </div>

        <div>
          {
            props.game.players.map(player => (
              <PlayerStatus
                isLoggedUser={props.user?.username === player.user.username}
                isOwner={props.game.owner.username === player.user.username}
                player={player}
              />
            ))
          }

        </div>

          <button>Leave/Join</button>
          <button>Delete</button>
        <div>

        </div>
      </div>
    </article>
  );
}


interface PlayerStatusProps {
  isLoggedUser: boolean;
  isOwner: boolean;
  player: Player;
  onReadyChange?: (newValue: boolean) => void;
}

function PlayerStatus(props: PlayerStatusProps) {
  return (
      <div style={{ display: 'flex', marginBottom: '0.5rem' }} key={props.player.user.username}>
      <div style={{
        backgroundColor: 'var(--accent-bg)',
        width: '2rem',
        height: '2rem',
        marginRight: '0.5rem',
      }}>
      </div>
      <div style={{ marginRight: 'auto' }}>
        {props.player.user.username}
        {
          If(props.isOwner) && (
            <>
              &nbsp;
              <img
                src={crown}
                alt="game owner"
                title="game owner"
                style={{ width: '1em', height: '1em' }}
              />
            </>
          )
        }
      </div>
      <input
        type="checkbox"
        checked={props.player.ready}
        disabled={!props.isLoggedUser}
        title={props.player.ready ? 'ready' : 'not ready'}
        style={{ marginLeft: '1rem' }}
        onChange={e => props.onReadyChange?.(e.target.checked)}
      ></input>
    </div>
  );
}


function SearchGamesForm() {
  const [searchField, setSearchField] = useState('name');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={styles.searchGames} onSubmit={onSubmit}>
      <FormSelect
        selected={searchField}
        onChange={setSearchField}
        options={[
          { label: 'Name', value: 'name' },
          { label: 'Owner', value: 'owner' },
        ]}
      ></FormSelect>
      <input
        type="text"
        placeholder="Search games..."
        className={styles.searchQuery}
      ></input>
      <FormButton type="submit">Search</FormButton>
      <FormButton type="button">New Game</FormButton>
    </form>
  );
}

interface FormSelectProps {
  options: { label: string, value: string }[];
  selected?: string;
  onChange?: (newValue: string) => void;
}

export function FormSelect(props: FormSelectProps) {
  return (
    <select
      value={props.selected}
      onChange={e => props.onChange?.(e.target.value)}
    >
      {
        props.options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))
      }
    </select>
  );
}