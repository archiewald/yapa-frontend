import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { DashboardPage } from "pages/dashboard/DashboardPage";
import { SettingsPage } from "pages/settings/SettingsPage";
import { RegisterPage } from "pages/register/RegisterPage";
import { LoginPage } from "pages/login/LoginPage";
import { NotFoundPage } from "pages/not-found/NotFoundPage";
import { PomodorosPage } from "pages/pomodoros/PomodorosPage";
import { ConfirmEmailPage } from "pages/confirm-email/ConfirmEmailPage";
import { AboutPage } from "pages/about/AboutPage";
import { TermsOfServicePage } from "pages/terms-of-service/TermsOfService";
import { PrivacyPolicyPage } from "pages/privacy-policy/PrivacyPolicyPage";
import { HomePage } from "pages/home/HomePage";

import { Loader } from "ui/Loader";
import { PrivateRoute } from "utils/router/PrivateRoute";
import { useStore } from "store/useStore";
import { CookiesBanner } from "ui/CookiesBanner";

export const App: React.FC = () => {
  const { isLoading, user, areCookiesAccepted, dispatch } = useStore(
    "isLoading",
    "areCookiesAccepted",
    "user"
  );

  return (
    <>
      {isLoading && <Loader />}
      {!areCookiesAccepted && (
        <CookiesBanner
          onAcceptClick={() => {
            dispatch("setAreCookiesAccepted", true);
          }}
        />
      )}

      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
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

        <Route path="/dashboard">
          {user === null && <Redirect to="/login" />}
          {user && <DashboardPage />}
        </Route>
        <PrivateRoute path="/settings">
          <SettingsPage />
        </PrivateRoute>
        <PrivateRoute path="/pomodoros">
          <PomodorosPage />
        </PrivateRoute>

        <Route path="/about">
          <AboutPage />
        </Route>

        <Route path="/terms-of-service">
          <TermsOfServicePage />
        </Route>
        <Route path="/privacy-policy">
          <PrivacyPolicyPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
};
