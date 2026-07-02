'use client';
import React from "react";
import { NavLink } from "@/lib/router";
import { AnchorLink } from ".";

const ListItem = ({ listType, href, children, className }) => {
  let list = null;
  switch (listType) {
    case "NavLink":
      list = <li className={className}>
       <NavLink to={href} className="nav-menu">
        {children}
      </NavLink>
      </li>
      break;
    case "ListWAnchor":
      list = <li className={className}>
        <AnchorLink to={href}>
          {children}
        </AnchorLink>;
      </li>
      break;

    default:
      list = <li className={className}>{children}</li>;
      break;
  }
  return list;
};

export default ListItem;
