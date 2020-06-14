import React from "react";
import ReactDOM from "react-dom";

import { store } from "./store";

import * as serviceWorker from "./serviceWorker";
import "./styles/index.scss";
import { StoreContext } from "storeon/react";
import { App } from "./App";

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

function handleNotificationsActions(registration: ServiceWorkerRegistration) {
  registration.addEventListener("notificationclick", (event: any) => {
    console.log("notificationClicked", event);
    event.notification.close();

    // if (event.action === "startShortBreak"){
    //   registration
    // }
  });
}
