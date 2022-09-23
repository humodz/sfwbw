import crown from '../../assets/icons/crown.png';
import { Game, Player, User } from '../../store/apiSlice/models';
import { If } from '../../utils/jsx-conditionals';

import { nations } from '@sfwbw/sfwbw-assets';
import { Nation } from '@sfwbw/sfwbw-core';
import { FormSelect } from '../forms/FormSelect';

interface GamePreviewProps {
  user: User | null;
  game: Game;
}

export function GamePreview(props: GamePreviewProps) {
  const userIsOwner = props.user?.username === props.game.owner.username;

  const userIsInGame = props.game.players.some(
    (player) => player.user.username === props.user?.username,
  );

  const gameIsFull =
    props.game.players.length >= props.game.designMap.maxPlayers;

  return (
    <article>
      <h5 style={{ marginBottom: '0.5rem' }}>{props.game.name}</h5>
      <small>{props.game.designMap.name}</small>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--accent-bg)',
            width: '10rem',
            height: '10rem',
          }}
        >
          map goes here
        </div>

        <div style={{ flexGrow: 1, flexBasis: 0 }}>
          <div>
            Players: {props.game.players.length} /{' '}
            {props.game.designMap.maxPlayers}
          </div>

          {props.game.players.map((player) => (
            <PlayerStatus
              key={player.user.username}
              isLoggedUser={props.user?.username === player.user.username}
              isOwner={props.game.owner.username === player.user.username}
              player={player}
            />
          ))}
        </div>

        <div style={{ flexGrow: 1, flexBasis: 0 }}></div>
      </div>
      <form
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          columnGap: '0.5rem',
        }}
      >
        {If(userIsInGame) && <button type="button">Leave</button>}
        {If(!userIsInGame && !gameIsFull) && (
          <>
            <input
              type="password"
              placeholder="Password"
              style={{ margin: '0.5rem 0' }}
              required={true}
            />
            <button type="submit">Join</button>
          </>
        )}
        {If(userIsOwner) && <button type="button">Delete</button>}
      </form>
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
  const nationImage = nations[props.player.nation];

  const nationSelectOptions = [
    { label: 'Red Star', value: Nation.RED_STAR },
    { label: 'Blue Moon', value: Nation.BLUE_MOON },
    { label: 'Green Earth', value: Nation.GREEN_EARTH },
    { label: 'Yellow Comet', value: Nation.YELLOW_COMET },
  ];

  return (
    <div
      style={{ display: 'flex', marginBottom: '0.5rem' }}
      key={props.player.user.username}
    >
      <div
        style={{
          backgroundImage: `url(${nationImage})`,
          imageRendering: 'pixelated',
          backgroundSize: 'contain',
          width: '2rem',
          height: '2rem',
          marginRight: '0.5rem',
        }}
      >
        <FormSelect
          options={nationSelectOptions}
          style={{ cursor: 'pointer', opacity: 0, height: '100%' }}
        />
      </div>
      <div style={{ marginRight: 'auto' }}>
        {props.player.user.username}
        {If(props.isOwner) && (
          <>
            &nbsp;
            <img
              src={crown}
              alt="game owner"
              title="game owner"
              style={{ width: '1em', height: '1em' }}
            />
          </>
        )}
      </div>
      <input
        type="checkbox"
        checked={props.player.ready}
        disabled={!props.isLoggedUser}
        title={props.player.ready ? 'ready' : 'not ready'}
        style={{ marginLeft: '1rem' }}
        onChange={(e) => props.onReadyChange?.(e.target.checked)}
      ></input>
    </div>
  );
}
