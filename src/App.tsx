import React from "react";
import { useStoreon } from "storeon/react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { AppState } from "store";

import { DashboardPage } from "pages/dashboard/DashboardPage";
import { SettingsPage } from "pages/settings/SettingsPage";
import { RegisterPage } from "pages/register/RegisterPage";
import { LoginPage } from "pages/login/LoginPage";
import { NotFoundPage } from "pages/not-found/NotFoundPage";
import { Loader } from "ui/Loader";
import { ConfirmEmailPage } from "pages/confirm-email/ConfirmEmailPage";
import { PrivateRoute } from "utils/router/PrivateRoute";
import { useStore } from "store/useStore";

export const App: React.FC = () => {
  const { isLoading } = useStoreon<AppState>("isLoading");
  const { user } = useStore("user");

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      <Switch>
        <Route path="/" exact={true}>
          {user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>

        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/confirm-email/:token">
          <ConfirmEmailPage />
        </Route>

        <PrivateRoute path="/dashboard">
          <DashboardPage />
        </PrivateRoute>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
