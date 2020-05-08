import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useStore } from "store/useStore";

import { NavigationLink } from "./NavigationLink";
import "./NavigationBar.scss";
import { api } from "api";
import { useHistory } from "react-router-dom";

export interface NavigationItem {
  route: string;
  name: string;
}

const NAVIGATION_ITEMS_PUBLIC: NavigationItem[] = [
  {
    route: "/login",
    name: "Login",
  },
  {
    route: "/register",
    name: "Register",
  },
];

const NAVIGATION_ITEMS_PRIVATE: NavigationItem[] = [
  {
    route: "/dashboard",
    name: "Dashboard",
  },
  {
    route: "/settings",
    name: "Settings",
  },
  {
    route: "/pomodoros",
    name: "Pomodoros",
  },
];

export const NavigationBar: React.FC = () => {
  const { user, dispatch } = useStore("user");
  const history = useHistory();

  return (
    <Navbar variant="dark" bg="dark" className="NavigationBar">
      <Nav className="mr-auto">
        <ul className="navbar-nav">
          {user && NAVIGATION_ITEMS_PRIVATE.map(renderNavItem)}
          {user && (
            <li className="nav-item">
              <Button
                variant="link"
                className="nav-link"
                onClick={async () => {
                  await api.logout();
                  dispatch("userClear");
                  history.push("/");
                }}
              >
                Logout
              </Button>
            </li>
          )}
          {user === null && NAVIGATION_ITEMS_PUBLIC.map(renderNavItem)}
        </ul>
      </Nav>
    </Navbar>
  );
};

function renderNavItem({ route, name }: NavigationItem) {
  return (
    <li className="nav-item" key={route}>
      <NavigationLink to={route}>{name}</NavigationLink>
    </li>
  );
}
