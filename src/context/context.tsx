import React, { createContext, Dispatch } from "react";

import { reducer, Action, InitialState, initialState } from "./reducer";

const WeatherAppContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function WeatherAppProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { children } = props;

  return (
    <WeatherAppContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherAppContext.Provider>
  );
}

const WeatherAppConsumer = WeatherAppContext.Consumer;

export { WeatherAppContext, WeatherAppProvider, WeatherAppConsumer };
