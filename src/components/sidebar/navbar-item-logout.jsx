import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const NavBarItemLogout = ({ link, svg, name, click }) => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <li className="nav-item" onClick={click}>
      <Link to={link} className="nav-link" onClick={handleLogout}>
        {svg}
        <span className="link-text">{name}</span>
      </Link>
    </li>
  );
};

export default NavBarItemLogout;
