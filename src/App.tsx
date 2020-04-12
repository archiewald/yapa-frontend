import React from "react";
import { useStoreon } from "storeon/react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { DashboardPage } from "pages/dashboard/DashboardPage";
import { SettingsPage } from "pages/settings/SettingsPage";
import { RegisterPage } from "pages/register/RegisterPage";
import { LoginPage } from "pages/login/LoginPage";
import { Loader } from "ui/Loader";
import { AppState } from "store";

export const App: React.FC = () => {
  const { isLoading } = useStoreon<AppState>("isLoading");

  return (
    <BrowserRouter basename="yapa-frontend">
      {isLoading && <Loader />}
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
