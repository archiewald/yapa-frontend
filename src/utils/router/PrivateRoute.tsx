import React from "react";
import { RouteProps, Route } from "react-router-dom";
import { useStore } from "store/useStore";
import { NotFoundPage } from "pages/not-found/NotFoundPage";

export interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...props
}) => {
  const { user } = useStore("user");

  return <Route {...props}>{user ? children : <NotFoundPage />}</Route>;
};
