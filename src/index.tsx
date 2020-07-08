import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import { store } from "./store";

import * as serviceWorker from "./serviceWorker";
import "./styles/index.scss";
import { StoreContext } from "storeon/react";
import { App } from "./App";
import { WithTracker } from "utils/WithTracker";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      {process.env.NODE_ENV === "production" ? (
        <Route component={WithTracker(App)} />
      ) : (
        <App />
      )}
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
