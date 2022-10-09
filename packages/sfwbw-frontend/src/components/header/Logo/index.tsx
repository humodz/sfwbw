import styles from './styles.module.css';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img src={logo} alt="Super Famicom Wars" draggable={false} />
      <svg>
        <text y="1em">by Web</text>
      </svg>
    </Link>
  );
}
