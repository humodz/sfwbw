import styles from './styles.module.css';

import { Game, Player, User } from '../../store/api';
import { ElseIf, If } from '../../utils/jsxConditionals';

import { Nation } from '@sfwbw/sfwbw-core';
import React, { useState } from 'react';
import { isDeleted } from '../../utils/deleted';
import { PlayerStatus } from './PlayerStatus';

interface GamePreviewProps {
  user: User | null;
  game: Game & { deleted?: boolean };
  onJoin?: (password: string) => void;
  onLeave?: () => void;
  onDelete?: () => void;
  onPlayerNationChange?: (nation: Nation) => void;
  onPlayerReadyChange?: (ready: boolean) => void;
}

export function GamePreview(props: GamePreviewProps) {
  const [passwordAttempt, setPasswordAttempt] = useState('');

  const gameIsDeleted = isDeleted(props.game);
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

  const onDelete = () => {
    const wantsToDelete = window.confirm('Are you sure?');
    if (wantsToDelete) {
      props.onDelete?.();
    }
  };

  return (
    <article
      className={styles.gamePreview}
      style={{ opacity: gameIsDeleted ? 0.5 : 1 }}
    >
      <h5>
        {gameIsDeleted ? <strong>[DELETED] </strong> : ''}
        {props.game.name}
      </h5>
      <small>{props.game.designMap.name}</small>
      <div className={styles.content}>
        <div>
          <div className={styles.mapPreview}>map goes here</div>
        </div>

        <div className={styles.players}>
          <div>
            Players: {props.game.players.length} /{' '}
            {props.game.designMap.maxPlayers}
          </div>

          {props.game.players.map((player) => (
            <PlayerStatus
              key={player.user.username}
              isEditable={
                !gameIsDeleted && props.user?.username === player.user.username
              }
              isOwner={userIsOwner}
              player={player}
              availableNations={getAvailableNations(player, props.game.players)}
              onReadyChange={props.onPlayerReadyChange}
              onNationChange={props.onPlayerNationChange}
            />
          ))}
        </div>

        <div className={styles.details}>Game Details (max turns etc)</div>
      </div>
      <form className={styles.buttons} onSubmit={onJoin}>
        {If(userIsInGame) ? (
          <button
            type="button"
            onClick={props.onLeave}
            disabled={gameIsDeleted}
          >
            Leave
          </button>
        ) : ElseIf(!gameIsFull) ? (
          <>
            {If(props.game.hasPassword) && (
              <input
                type="password"
                placeholder="Password"
                required={true}
                value={passwordAttempt}
                disabled={gameIsDeleted}
                onChange={(e) => setPasswordAttempt(e.target.value)}
              />
            )}
            <button type="submit">Join</button>
          </>
        ) : null}
        {If(userIsOwner) && (
          <button type="button" onClick={onDelete} disabled={gameIsDeleted}>
            Delete
          </button>
        )}
      </form>
    </article>
  );
}

function getAvailableNations(player: Player, players: Player[]) {
  return Object.values(Nation).filter(
    (nation) =>
      nation !== Nation.NEUTRAL &&
      players.every(
        (it) =>
          it.user.username === player.user.username || it.nation !== nation,
      ),
  );
}
