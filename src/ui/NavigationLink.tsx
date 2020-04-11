import React from "react";
import { NavLink } from "react-router-dom";

export interface NavigationLinkProps {
  to: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  children,
}) => (
  <NavLink exact={true} className="nav-link" activeClassName="active" to={to}>
    {children}
  </NavLink>
);
