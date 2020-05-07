import React from "react";
import { NavLink } from "react-router-dom";

const SidebarModule = ({
  expandClass,
  link,
  logo: Logo,
  title,
  toggleSidebar
}) => {
  return (
    <li className={expandClass}>
      <NavLink to={link} className="nav-link" onClick={toggleSidebar}>
        <i>
          <Logo color="#ffa501" />
          {"  "}
        </i>
        <span>{title}</span>
      </NavLink>
    </li>
  );
};

export default SidebarModule;
