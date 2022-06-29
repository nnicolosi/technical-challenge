import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navigation.scss';

// We can store the data for each NavLink in a list to help modularize the code a bit
// If this list was lengthy enough we might want to import it from a separate file.
const startMenuObjects = [
  {key: 'contacts', className: 'navbar-item', to: '/contacts', activeClassName: 'active', textContent: 'Contacts'},
  {key: 'call-list', className: 'navbar-item', to: '/call-list', activeClassName: 'active', textContent: 'Call List'},
]

const Navigation = () => {
  const [burgerMenuToggle, setBurgerMenuToggle] = useState(false);

  const startMenuItems = () => startMenuObjects.map(({ textContent, ...props }) => <NavLink {...props}>{textContent}</NavLink>);

  const endMenuItems = () => {
    const items = [];
    return items;
  };

  const toggleBurgerMenu = () => {
    setBurgerMenuToggle(!burgerMenuToggle);
  };

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/favicon-32x32.png" alt="Logo" width="28" height="28" />
          <span className="navbar-brand-name">Technical Challenge</span>
        </Link>
        {/* eslint-disable-next-line */}
        <a id="burger" className={`navbar-burger ${burgerMenuToggle ? 'is-active' : ''}`} onClick={toggleBurgerMenu} data-target="menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="menu" className={`navbar-menu ${burgerMenuToggle ? 'is-active' : ''}`}>
        <div className="navbar-start">{startMenuItems()}</div>
        <div className="navbar-end">{endMenuItems()}</div>
      </div>
    </nav>
  );
};

export default Navigation;
