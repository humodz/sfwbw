import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { setAccessToken } from './store/authSlice';
import { useCurrentUser } from './store/authSlice';
import { Games } from './views/Games';
import { Profile } from './views/Profile';
import { SignIn } from './views/SignIn';

import { Footer } from './components/Footer';
import { Header } from './components/header/Header';
import { Home } from './views/Home';
import { Maps } from './views/Maps';
import { useAppDispatch } from './store/hooks';

export function App() {
  const dispatch = useAppDispatch();

  const user = useCurrentUser();

  const signOut = () => {
    dispatch(setAccessToken(null));
  };

  return (
    <>
      <Header isLoggedIn={!!user} signOut={signOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/*" element={<Games />} />
        <Route path="/maps/*" element={<Maps />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <RemoveTrailingSlash />
      <Footer />
    </>
  );
}

function RemoveTrailingSlash() {
  const location = useLocation();

  if (location.pathname === '/' || !location.pathname.endsWith('/')) {
    return null;
  }

  const newLocation = {
    pathname: location.pathname.slice(0, -1),
    search: location.search,
  };

  return <Navigate replace to={newLocation} />;
}
