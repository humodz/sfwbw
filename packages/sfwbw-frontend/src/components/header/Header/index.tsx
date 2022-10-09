import { Link } from 'react-router-dom';
import { Else, If } from '../../../utils/jsxConditionals';
import { Logo } from '../Logo';

interface Props {
  isLoggedIn: boolean;
  signOut: () => void;
}

export function Header(props: Props) {
  return (
    <header>
      <nav>
        <Link to="/games">Games</Link>
        <Link to="/maps">Maps</Link>
        {If(props.isLoggedIn) ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={props.signOut}>Sign Out</button>
          </>
        ) : (
          Else(<Link to="/sign-in">Sign In</Link>)
        )}
      </nav>
      <Logo />
    </header>
  );
}
