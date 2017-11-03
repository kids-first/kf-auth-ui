import React from 'react';
import { css } from 'glamor';
import { NavLink } from 'react-router-dom';

import Logout from 'components/Logout';
import styles from './Nav.styles';
import { compose } from 'recompose';
import { injectState } from 'freactal';

const resetList = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const enhance = compose(injectState);

const render = ({ state }) => (
  <div className={`Nav ${css(styles.container)}`}>
    <img className={`Emblem ${css(styles.logo)}`} src={require('assets/brand-image.svg')} alt="" />
    <ul className={`LinkList ${css(resetList, styles.linkList)}`}>
      <li>
        <NavLink className={`NavLink ${css(styles.link)}`} to="/users" activeClassName={'active'}>
          <span>Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink className={`NavLink ${css(styles.link)}`} to="/groups" activeClassName={'active'}>
          <span>Groups</span>
        </NavLink>
      </li>
      <li>
        <NavLink className={`NavLink ${css(styles.link)}`} to="/apps" activeClassName={'active'}>
          <span>Apps</span>
        </NavLink>
      </li>
    </ul>
    {state.loggedInUser.first_name}
    <Logout className={`Logout ${css(styles.logout)}`} />
  </div>
);

const Nav = enhance(render);

export default Nav;
