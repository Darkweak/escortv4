import React from 'react';
import {redirectTo} from "../../../functions/redirect";

export const NavItem = ({history, pathName, text}) => (
  <li onClick={() => redirectTo(history, pathName)} className="nav-item">
    <span className={['nav-link', pathName === window.location.pathname && 'active'].join(' ')}>
      {text}
    </span>
  </li>
);
