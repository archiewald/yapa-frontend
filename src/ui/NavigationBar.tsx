import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavigationLink } from "./NavigationLink";

export const NavigationBar: React.FC = () => {
  return (
    <Navbar bg="light">
      <Nav className="mr-auto">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavigationLink to="/">Dashboard</NavigationLink>
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
