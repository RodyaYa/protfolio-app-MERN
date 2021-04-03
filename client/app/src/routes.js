import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { NotAuthRoutes } from "./NotAuthRoutes";

export const useRoutes = (isAuth) => {
  return isAuth ? <AuthRoutes /> : <NotAuthRoutes />;
};
