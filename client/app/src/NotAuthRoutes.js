import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/Authorization/AuthPage";

export const NotAuthRoutes = () => {
  return (
    <Switch>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Redirect from="*" to="/auth" />
    </Switch>
  );
};
