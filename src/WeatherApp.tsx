import { useContext, useEffect } from "react";

import { WeatherAppContext } from "./context/context";
import { Actions } from "./context/reducer";

import Header from "./components/Header";

const App = () => {
  const { state, dispatch } = useContext(WeatherAppContext);

  useEffect(() => {
    dispatch({ type: Actions.INITIALISE });
  }, []);

  return <Header />;
};

export default App;
