import { NavLink } from 'react-router-dom';
import { Else, If } from '../../../utils/jsxConditionals';
import { Logo } from '../Logo';

interface Props {
  isLoggedIn: boolean;
  signOut: () => void;
}

const classes = {
  navLink: (props: { isActive: boolean }) => (props.isActive ? 'active' : ''),
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
        {If(props.isLoggedIn) ? (
          <>
            <NavLink to="/profile" className={classes.navLink}>
              Profile
            </NavLink>
            <button onClick={props.signOut}>Sign Out</button>
          </>
        ) : (
          Else(
            <NavLink to="/sign-in" className={classes.navLink}>
              Sign In
            </NavLink>,
          )
        )}
      </nav>
      <Logo />
    </header>
  );
}
