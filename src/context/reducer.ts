import { ForecastWeather } from "../service/weather/types";

export enum LoadingStateEnum {
  CURRENT_WEATHER = "CURRENT_WEATHER",
}

export enum DataMetricEnum {
  FAHRENHEIT = "FAHRENHEIT",
  CELSIUS = "CELSIUS",
}

export interface InitialState {
  location: string;
  currentWeather?: ForecastWeather;
  loadingStates?: { [key in LoadingStateEnum]: boolean };
  metric: DataMetricEnum;
  alert?: string;
}

export const initialState: InitialState = {
  location: "",
  metric: DataMetricEnum.CELSIUS,
};

export enum Actions {
  INITIALISE = "INITIALISE",
  SET_LOCATION = "SET_LOCATION",
  SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER",
  START_LOADING = "START_LOADING",
  STOP_LOADING = "STOP_LOADING",
  SET_METRIC = "SET_METRIC",
  SHOW_ERROR = "SHOW_ERROR",
}

export type Action =
  | { type: Actions.SET_LOCATION; data: string }
  | { type: Actions.INITIALISE }
  | { type: Actions.SET_CURRENT_WEATHER; data: ForecastWeather }
  | { type: Actions.START_LOADING; data: LoadingStateEnum }
  | { type: Actions.STOP_LOADING; data: LoadingStateEnum }
  | { type: Actions.SET_METRIC; data: DataMetricEnum }
  | { type: Actions.SHOW_ERROR; data?: string };

export const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case Actions.SET_LOCATION:
      return { ...state, location: action.data };
    case Actions.SET_CURRENT_WEATHER:
      return { ...state, currentWeather: action.data };
    case Actions.SET_METRIC:
      return { ...state, metric: action.data };
    case Actions.START_LOADING:
      return {
        ...state,
        loadingStates: { ...state.loadingStates, [action.data]: true },
      };
    case Actions.STOP_LOADING:
      return {
        ...state,
        loadingStates: { ...state.loadingStates, [action.data]: false },
      };
    case Actions.SHOW_ERROR:
      return { ...state, alert: action.data };
    default:
      return state;
  }
};
