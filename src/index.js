import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import logger from "./services/logService";
import * as serviceWorker from "./serviceWorker";
import "../src/styleSheet/App.min.css";
import "../src/styleSheet/edustyle.css";
import "../src/styleSheet/responsive.css";
import "../src/styleSheet/main.css";
import "../src/styleSheet/normalize.css";
import "../src/styleSheet/all.min.css";
import "../src/styleSheet/bootstrap.min.css";
import "../src/styleSheet/style.css";
import "./index.css";

logger.init();

//console.log("SUPERMAN", process.env.REACT_APP_NAME);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
