import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { DashboardPage } from "pages/dashboard/DashboardPage";
import { SettingsPage } from "pages/settings/SettingsPage";
import { RegisterPage } from "pages/register/RegisterPage";
import { LoginPage } from "pages/login/LoginPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter basename="yapa-frontend">
      <Switch>
        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <DashboardPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
