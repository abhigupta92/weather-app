import { useContext, useEffect } from "react";

import { Box } from "./components/mui";

import locationService from "./service/location";

import { WeatherAppContext } from "./context/WeatherAppContext";

import Header from "./components/Header";
import WeatherBody from "./components/WeatherBody";
import Alert from "./components/Alert";

import { Actions } from "./context/reducer";
import { CurrentLocation } from "./service/location/types";

import "./index.css";
import { msg } from "./constants";

const App = () => {
  const { state, dispatch } = useContext(WeatherAppContext);
  const { alert } = state;

  useEffect(() => {
    initialise();
    // eslint-disable-next-line
  }, []);

  const handleResponse = (response: CurrentLocation) => {
    const { country, city } = response;
    dispatch({ type: Actions.SET_LOCATION, data: `${country}, ${city}` });
  };

  const initialise = () =>
    locationService
      .getCurrentLocation()
      .then(handleResponse)
      .catch(() =>
        dispatch({ type: Actions.SHOW_ERROR, data: msg.retryAgain })
      );

  const onCloseAlert = () =>
    dispatch({ type: Actions.SHOW_ERROR, data: undefined });

  return (
    <Box className="app-container">
      <Header />
      <WeatherBody />
      <Alert msg={alert} onClose={onCloseAlert} />
    </Box>
  );
};

export default App;
