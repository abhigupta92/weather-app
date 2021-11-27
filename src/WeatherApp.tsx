import { useContext, useEffect } from "react";

import locationService from "./service/location";

import { WeatherAppContext } from "./context/context";

import Header from "./components/Header";

const App = () => {
  const { dispatch } = useContext(WeatherAppContext);

  useEffect(() => {
    initialise();
    // eslint-disable-next-line
  }, []);

  const initialise = () => {
    locationService.getCurrentLocation(dispatch);
  };

  return <Header />;
};

export default App;
