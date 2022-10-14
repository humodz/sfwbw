import { NavLink } from 'react-router-dom';
import { navActiveClass } from '../../../utils/router';
import { Logo } from '../Logo';

interface Props {
  isLoggedIn: boolean;
  signOut: () => void;
}

const classes = {
  navLink: navActiveClass(),
};

export function Header(props: Props) {
  return (
    <header>
      <nav>
        <NavLink to="/games" className={classes.navLink}>
          Games
        </NavLink>
        <NavLink to="/maps" className={classes.navLink}>
          Maps
        </NavLink>
        {props.isLoggedIn ? (
          <>
            <NavLink to="/games/my-turn" className={classes.navLink}>
              My Turn
            </NavLink>
            <NavLink to="/profile" className={classes.navLink}>
              Profile
            </NavLink>
            <button onClick={props.signOut}>Sign Out</button>
          </>
        ) : (
          <NavLink to="/sign-in" className={classes.navLink}>
            Sign In
          </NavLink>
        )}
      </nav>
      <Logo />
    </header>
  );
}
