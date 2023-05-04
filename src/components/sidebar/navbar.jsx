import React from "react";
import NavBarItem from "./navbar-item";
import "./navbar.css";
import Logo from "./icons/logo.jsx";
import Cat from "./icons/cat.jsx";
import Alien from "./icons/alien.jsx";
import Space from "./icons/space.jsx";
import Shuttle from "./icons/shuttle.jsx";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <a href="#" className="nav-link">
            <span className="link-text logo-text">ELECTIVE</span>
            <Logo />
          </a>
        </li>

        <NavBarItem link={"/"} svg={<Cat />} name={"Dashboard"} />
        <NavBarItem link={"/request"} svg={<Alien />} name={"Admin Controls"} />
        <NavBarItem link={"/pending"} svg={<Space />} name={"Choose OE"} />
        <NavBarItem link={"/login"} svg={<Shuttle />} name={"Logout"} />

        
      </ul>
    </nav>
  );
};

export default NavBar;
