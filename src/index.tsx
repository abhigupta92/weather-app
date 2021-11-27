import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { WeatherAppProvider } from "./context/context";

import WeatherApp from "./WeatherApp";

ReactDOM.render(
  <React.StrictMode>
    <WeatherAppProvider>
      <WeatherApp />
    </WeatherAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
