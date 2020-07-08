import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import { store } from "./store";

import * as serviceWorker from "./serviceWorker";
import "./styles/index.scss";
import { StoreContext } from "storeon/react";
import { App } from "./App";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-130671604-3");
}

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
