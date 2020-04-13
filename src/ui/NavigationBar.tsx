import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavigationLink } from "./NavigationLink";

export const NavigationBar: React.FC = () => {
  return (
    <Navbar variant="dark" bg="dark">
      <Nav className="mr-auto">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavigationLink to="/dashboard">Dashboard</NavigationLink>
          </li>
          <li className="nav-item">
            <NavigationLink to="/login">Login</NavigationLink>
          </li>
          <li className="nav-item">
            <NavigationLink to="/settings">Settings</NavigationLink>
          </li>
          <li className="nav-item">
            <NavigationLink to="/register">Register</NavigationLink>
          </li>
        </ul>
      </Nav>
    </Navbar>
  );
};
