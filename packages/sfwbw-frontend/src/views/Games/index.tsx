import { NavLink, Route, Routes } from 'react-router-dom';
import { navActiveClass } from '../../utils';
import { BrowseGames } from './Browse';

const classes = {
  nav: 'mb-8 grid grid-cols-2 md:grid-cols-4 gap-2',
  navLink: navActiveClass(),
};

export function Games() {
  return (
    <main>
      <nav className={classes.nav}>
        <NavLink to="/games" end className={classes.navLink}>
          Browse
        </NavLink>
        <NavLink to="/games/new" className={classes.navLink}>
          New Game
        </NavLink>
        <NavLink to="/games/my-games" className={classes.navLink}>
          My Games
        </NavLink>
        <NavLink to="/games/my-turn" className={classes.navLink}>
          My Turn
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<BrowseGames mode="all" />} />
        <Route path="/new" element={'WIP NEW GAME'} />
        <Route path="/my-games" element={<BrowseGames mode="my-games" />} />
        <Route path="/my-turn" element={<BrowseGames mode="my-turn" />} />
      </Routes>
    </main>
  );
}
