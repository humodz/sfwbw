import { NavLink, Route, Routes } from 'react-router-dom';
import { navActiveClass } from '../../utils';
import { BrowseMaps } from './Browse';
import { NewMap } from './NewMap';

const classes = {
  nav: 'mb-8 grid grid-cols-3 gap-2',
  navLinkBrowse: navActiveClass('col-span-2 md:col-span-1'),
  navLink: navActiveClass(),
};

export function Maps() {
  return (
    <main>
      <nav className={classes.nav}>
        <NavLink to="/maps" end className={classes.navLink}>
          Browse
        </NavLink>
        <NavLink to="/maps/new" className={classes.navLink}>
          New <span className="md:inline hidden">Map</span>
        </NavLink>
        <NavLink to="/maps/my-maps" className={classes.navLink}>
          My Maps
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<BrowseMaps />} />
        <Route path="/new" element={<NewMap />} />
        <Route path="/my-maps" element={'WIP MY-MAPS'} />
        <Route path="/:id/edit" element={'WIP edit map'} />
      </Routes>
    </main>
  );
}
