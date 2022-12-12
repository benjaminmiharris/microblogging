import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { UsernameContextProvider } from "./context/UsernameContext";
import { TweetlistContextProvider } from "./context/TweetlistContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsernameContextProvider>
    <TweetlistContextProvider>
      <App />
    </TweetlistContextProvider>
  </UsernameContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
