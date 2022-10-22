import { NavLink, Route, Routes } from 'react-router-dom';
import { navActiveClass } from '../../utils';
import { BrowseMaps } from './Browse';
import { DevPlayMap } from './DevPlayMap';
import { EditMap } from './EditMap';
import { NewMap } from './NewMap';

const classes = {
  nav: 'mb-8 grid grid-cols-2 md:grid-cols-3 gap-2',
  navLinkBrowse: navActiveClass('col-span-2 md:col-span-1'),
  navLink: navActiveClass(),
};

export function Maps() {
  return (
    <main>
      <nav className={classes.nav}>
        <NavLink to="/maps" end className={classes.navLinkBrowse}>
          Browse
        </NavLink>
        <NavLink to="/maps/new" className={classes.navLink}>
          New Map
        </NavLink>
        <NavLink to="/maps/my-maps" className={classes.navLink}>
          My Maps
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<BrowseMaps mode="all" />} />
        <Route path="/new" element={<NewMap />} />
        <Route path="/my-maps" element={<BrowseMaps mode="my-maps" />} />
        <Route path="/@:id" element={'wip map details'} />
        <Route path="/@:id/play" element={<DevPlayMap />} />
        <Route path="/@:id/edit" element={<EditMap />} />
      </Routes>
    </main>
  );
}
