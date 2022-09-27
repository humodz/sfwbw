import styles from './styles.module.css';
import logo from '../../assets/logo.png';

export function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Super Famicom Wars" />
      <svg>
        <text y="1em">by Web</text>
      </svg>
    </div>
  );
}
