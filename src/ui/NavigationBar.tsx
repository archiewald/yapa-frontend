import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useStore } from "store/useStore";

import { NavigationLink } from "./NavigationLink";
import "./NavigationBar.scss";

export interface NavigationItem {
  route: string;
  name: string;
}

const NAVIGATION_ITEMS_PUBLIC: NavigationItem[] = [
  {
    route: "/",
    name: "🍅 Yapa",
  },
  {
    route: "/login",
    name: "Login",
  },
  {
    route: "/register",
    name: "Sign up",
  },
  {
    route: "/about",
    name: "About",
  },
];

const NAVIGATION_ITEMS_PRIVATE: NavigationItem[] = [
  {
    route: "/dashboard",
    name: "🍅 Dashboard",
  },
  {
    route: "/settings",
    name: "Settings",
  },
  {
    route: "/pomodoros",
    name: "Pomodoros",
  },
  {
    route: "/about",
    name: "About",
  },
  {
    route: "/",
    name: "Home",
  },
];

export const NavigationBar: React.FC = () => {
  const { user } = useStore("user");

  return (
    <Navbar variant="dark" bg="dark" className="NavigationBar">
      <Nav className="mr-auto">
        <ul className="navbar-nav flex-wrap">
          {user && NAVIGATION_ITEMS_PRIVATE.map(renderNavItem)}
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
