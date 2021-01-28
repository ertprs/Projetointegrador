import React from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStylesNavbar from './stylesNavbar';

function Navbar({ picture, name }) {
  const classes = useStylesNavbar();
  return (
    <header className={classes.navbar}>
      <h1>
        <span>Projeto Integrador</span>app
      </h1>
      <div>
        <nav>
          <Link className={classes.link} to="/dashboard">
            Home
          </Link>
          <Link className={classes.link} to="/dashboard">
            Integração Google
          </Link>
          <Link className={classes.link} to="/dashboard/user/upgrade">
            Upgrade
          </Link>
        </nav>
        <div className={classes.profile}>
          <Avatar src={picture} />
          <span>{name}</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
