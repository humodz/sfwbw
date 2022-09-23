import styles from './styles.module.css';
import logo from '../../assets/logo.png';

export function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Super Famicom Wars" />
      <strong style={{ textShadow: textBorder('#000') }}>by Web</strong>
    </div>
  );
}

function textBorder(color: string) {
  return `
    2px 0 ${color},
    -2px 0 ${color},
    0 2px ${color},
    0 -2px ${color},
    1px 1px ${color},
    -1px -1px ${color},
    1px -1px ${color},
    -1px 1px ${color}
  `;
}
