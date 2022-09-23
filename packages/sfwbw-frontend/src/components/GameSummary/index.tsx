import styles from './styles.module.css';

import crown from '../../assets/icons/crown.png';
import { Game, Player, User } from '../../store/apiSlice/models';
import { If } from '../../utils/jsx-conditionals';

import { nations } from '@sfwbw/sfwbw-assets';
import { Nation } from '@sfwbw/sfwbw-core';
import { FormSelect } from '../forms/FormSelect';
import React, { useState } from 'react';

interface GamePreviewProps {
  user: User | null;
  game: Game;
  onJoin?: (password: string) => void;
  onLeave?: () => void;
  onDelete?: () => void;
  onPlayerNationChange?: (nation: Nation) => void;
  onPlayerReadyChange?: (ready: boolean) => void;
}

export function GamePreview(props: GamePreviewProps) {
  const [passwordAttempt, setPasswordAttempt] = useState('');

  const userIsOwner = props.user?.username === props.game.owner.username;

  const userIsInGame = props.game.players.some(
    (player) => player.user.username === props.user?.username,
  );

  const gameIsFull =
    props.game.players.length >= props.game.designMap.maxPlayers;

  const onJoin = (event: React.FormEvent) => {
    event.preventDefault();
    props.onJoin?.(passwordAttempt);
  };

  return (
    <article className={styles.gamePreview}>
      <h5>{props.game.name}</h5>
      <small>{props.game.designMap.name}</small>
      <div className={styles.content}>
        <div className={styles.mapPreview}>map goes here</div>

        <div className={styles.players}>
          <div>
            Players: {props.game.players.length} /{' '}
            {props.game.designMap.maxPlayers}
          </div>

          {props.game.players.map((player) => (
            <PlayerStatus
              key={player.user.username}
              isEditable={props.user?.username === player.user.username}
              isOwner={props.game.owner.username === player.user.username}
              player={player}
              onReadyChange={props.onPlayerReadyChange}
              onNationChange={props.onPlayerNationChange}
            />
          ))}
        </div>
      </div>
      <form className={styles.buttons} onSubmit={onJoin}>
        {If(userIsInGame) && (
          <button type="button" onClick={props.onLeave}>
            Leave
          </button>
        )}
        {If(!userIsInGame && !gameIsFull) && (
          <>
            <input
              type="password"
              placeholder="Password"
              required={true}
              value={passwordAttempt}
              onChange={(e) => setPasswordAttempt(e.target.value)}
            />
            <button type="submit">Join</button>
          </>
        )}
        {If(userIsOwner) && (
          <button type="button" onClick={props.onDelete}>
            Delete
          </button>
        )}
      </form>
    </article>
  );
}

interface PlayerStatusProps {
  isEditable: boolean;
  isOwner: boolean;
  player: Player;
  onNationChange?: (nation: Nation) => void;
  onReadyChange?: (ready: boolean) => void;
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
    <div className={styles.playerStatus} key={props.player.user.username}>
      <div
        className={styles.nation}
        style={{
          backgroundImage: `url(${nationImage})`,
        }}
      >
        {If(props.isEditable) && (
          <FormSelect
            options={nationSelectOptions}
            value={props.player.nation}
            onChange={(value) => props.onNationChange?.(value)}
          />
        )}
      </div>
      <div className={styles.username}>
        {props.player.user.username}
        {If(props.isOwner) && (
          <img src={crown} alt="game owner" title="game owner" />
        )}
      </div>
      <input
        className={styles.ready}
        type="checkbox"
        checked={props.player.ready}
        disabled={!props.isEditable}
        title={props.player.ready ? 'ready' : 'not ready'}
        onChange={(e) => props.onReadyChange?.(e.target.checked)}
      ></input>
    </div>
  );
}
