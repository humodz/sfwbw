import { NavLink } from 'react-router-dom';
import { navActiveClass } from '../../utils';

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
      <p>Welcome to Maps!</p>
    </main>
  );
}
