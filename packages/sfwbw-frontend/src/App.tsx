import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { setAccessToken } from './store/authSlice';
import { useAppDispatch, useCurrentUser } from './store/hooks';
import { Games } from './views/Games';
import { Profile } from './views/Profile';
import { SignIn } from './views/SignIn';

import { Footer } from './components/Footer';
import { Header } from './components/header/Header';
import { Home } from './views/Home';
import { Maps } from './views/Maps';

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
