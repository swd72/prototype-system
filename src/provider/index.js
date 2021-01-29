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
          <Route path="/manage" render={(props) => <RootNavigation {...props} />} />
          <Route path="/sigin" component={SignInPage} />
          <Redirect from="/" to="/manage/index" />
        </Switch>
      </StateProvider>
    </AuthProvider>
  );
}
