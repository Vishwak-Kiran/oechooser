import React from "react";

import { useLogout } from "../../hooks/useLogout";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const NavBarItemLogout = ({ link, svg, name, click }) => {

    const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <li className="nav-item" onClick={click}>
      <a href={link} className="nav-link">
        {svg}
        <span className="link-text">{name}</span>
      </a>
    </li>
  );
};

export default NavBarItemLogout;
