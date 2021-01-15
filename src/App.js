import React from "react";
import "./App.css";
import ProviderRoot from "./provider";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CookiesProvider } from "react-cookie";


const browserHistory = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

function App() {
  return (
    <CookiesProvider>
      <Router history={browserHistory} className="App">
        <ProviderRoot />
      </Router>
    </CookiesProvider>
  );
}

export default App;
