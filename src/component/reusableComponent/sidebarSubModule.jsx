import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SidebarSubModule = ({ link, title, toggleSidebar }) => {
  return (
    <li className="nav-item">
      <NavLink to={link} className="nav-link" onClick={toggleSidebar}>
        <i>
          <FaAngleRight />
        </i>
        {title}
      </NavLink>
    </li>
  );
};

export default SidebarSubModule;
