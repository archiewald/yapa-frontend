import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { Dashboard } from "pages/dashboard/Dashboard";
import { Settings } from "pages/settings/Settings";
import { Register } from "pages/register/Register";

export const App: React.FC = () => {
  return (
    <BrowserRouter basename="yapa-frontend">
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
