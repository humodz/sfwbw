import { NavLink, Route, Routes } from 'react-router-dom';
import { SearchGames } from './Search';

const classes = {
  nav: 'mb-8 grid grid-cols-2 md:grid-cols-4 gap-2',
  navLink: (props: { isActive: boolean }) => (props.isActive ? 'active' : ''),
};

export function Games() {
  return (
    <main>
      <nav className={classes.nav}>
        <NavLink to="/games" end className={classes.navLink}>
          Search
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
        <Route path="/" element={<SearchGames />} />
        <Route path="/new" element={'WIP NEW GAME'} />
        <Route path="/my-games" element={'WIP MY-GAMES'} />
        <Route path="/my-turn" element={'WIP MY-TURN'} />
      </Routes>
    </main>
  );
}
