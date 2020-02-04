import React from "react";
import ReactDOM from "react-dom";
import { ClientContextProvider } from "react-fetching-library";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Client } from "./api/client";

ReactDOM.render(
  <ClientContextProvider client={Client}>
    <App />
  </ClientContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
