import React from "react";
import { Link } from "react-router-dom";
import NavBarItem from "./navbar-item";
import "./navbar.css";
import Logo from "./icons/logo.jsx";
import Cat from "./icons/cat.jsx";
import Alien from "./icons/alien.jsx";
import Space from "./icons/space.jsx";
import Shuttle from "./icons/shuttle.jsx";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Print from "./icons/print";

const NavBar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <Link to="/" className="nav-link">
            <span className="link-text logo-text">ELECTIVE</span>
            <Logo />
          </Link>
        </li>

        {/* <NavBarItem link={"/"} svg={<Cat />} name={"Dashboard"} /> */}
        {user && user.uid === "mHgVONortQYvsoncQuk6rMRIxIY2" ? (
          <NavBarItem
            link={"/request"}
            svg={<Alien />}
            name={"Admin Controls"}
          />
        ) : (
          <></>
        )}
        {user && user.uid === "mHgVONortQYvsoncQuk6rMRIxIY2" ? (
          <NavBarItem link={"/download"} svg={<Print />} name={"Print"} />
        ) : (
          <></>
        )}
        <NavBarItem link={"/pending"} svg={<Space />} name={"Choose OE"} />
        <li className="nav-item">
          {!isPending && (
            <Link to="/" className="nav-link" onClick={logout}>
              <Shuttle />
              <span className="link-text">Logout</span>
            </Link>
          )}
          {isPending && (
            <a className="nav-link" disabled>
              <Shuttle />
              <span className="link-text">Logout</span>
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
