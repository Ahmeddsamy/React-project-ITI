import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import App from "./App";
import TokenContectProvider from "./context/tokenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TokenContectProvider>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </TokenContectProvider>
);
