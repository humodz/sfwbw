import styles from './styles.module.css';

import crown from '../../../assets/icons/crown.png';
import { Player } from '../../../store/api/models';
import { If } from '../../../utils/jsxConditionals';

import { nations } from '@sfwbw/sfwbw-assets';
import { Nation } from '@sfwbw/sfwbw-core';
import { FormSelect } from '../../forms/FormSelect';

interface PlayerStatusProps {
  isEditable: boolean;
  isOwner: boolean;
  player: Player;
  availableNations: Nation[];
  onNationChange?: (nation: Nation) => void;
  onReadyChange?: (ready: boolean) => void;
}

export function PlayerStatus(props: PlayerStatusProps) {
  const nationImage = nations[props.player.nation];

  const allNations = [
    { label: 'Red Star', value: Nation.RED_STAR },
    { label: 'Blue Moon', value: Nation.BLUE_MOON },
    { label: 'Green Earth', value: Nation.GREEN_EARTH },
    { label: 'Yellow Comet', value: Nation.YELLOW_COMET },
  ];

  const nationSelectOptions = allNations.filter((it) =>
    props.availableNations.includes(it.value),
  );

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
        {If(props.isOwner) && (
          <img src={crown} alt="game owner" title="game owner" />
        )}{' '}
        <span>{props.player.user.username}</span>
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
