import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { setAccessToken } from './store/authSlice';
import { useAppDispatch, useCurrentUser } from './store/hooks';
import { Else, If } from './utils/jsx-conditionals';
import { Editor } from './views/Editor';
import { Home } from './views/Home';
import { Profile } from './views/Profile';
import { SignIn } from './views/SignIn';

export function App() {
  const dispatch = useAppDispatch();

  const currentUser = useCurrentUser();

  const signOut = () => {
    dispatch(setAccessToken(null));
  };

  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          {(If(currentUser) && (
            <>
              <Link to="/profile">Profile</Link>
              <a onClick={signOut}>Sign Out</a>
            </>
          )) ||
            (Else && <Link to="/sign-in">Sign In</Link>)}
          <Link to="/editor">Editor</Link>
          <a target="_blank" href="https://github.com/humodz" rel="noreferrer">
            GitHub
          </a>
        </nav>

        <h1>Super Famicom Wars by Web</h1>
        {/* <p>subtitle</p> */}
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <footer></footer>
    </>
  );
}
