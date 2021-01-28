import React from "react";
import { AuthProvider } from "./AuthProvider";
import { StateProvider } from "./StateProvider";
import RootNavigation from "./RootNavigation";
import SignInPage from "../views/SignIn";
import { Switch, Route, Redirect } from 'react-router-dom'
export default function Providers() {
  return (
    <AuthProvider>
      <StateProvider>
        <Switch>
          <Route path="/side" render={(props) => <RootNavigation layout_type="side" {...props} />} />
          <Route path="/unside" render={(props) => <RootNavigation layout_type="unside" {...props} />} />
          <Route path="/sigin" component={SignInPage} />
          <Redirect from="/" to="/side/index" />
        </Switch>
      </StateProvider>
    </AuthProvider>
  );
}
