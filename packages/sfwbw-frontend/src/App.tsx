import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { setAccessToken } from './store/authSlice';
import { useAppDispatch, useCurrentUser } from './store/hooks';
import { Else, If } from './utils/jsxConditionals';
import { Editor } from './views/Editor';
import { Home } from './views/Home';
import { Profile } from './views/Profile';
import { SignIn } from './views/SignIn';

import { Logo } from './components/header/Logo';
import { NewGame } from './views/NewGame';
import { Header } from './components/header/Header';
import { ReactNode } from 'react';
import { Footer } from './components/Footer';

export function App() {
  const dispatch = useAppDispatch();

  const currentUser = useCurrentUser();

  const signOut = () => {
    dispatch(setAccessToken(null));
  };

  return (
    <>
      <Header isLoggedIn={!!currentUser} signOut={signOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/new-game" element={<NewGame />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}
