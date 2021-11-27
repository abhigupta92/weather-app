export interface InitialState {
  location: string;
}

export const initialState: InitialState = {
  location: "",
};

export enum Actions {
  INITIALISE = "INITIALISE",
  SET_LOCATION = "SET_LOCATION",
}

export type Action =
  | { type: Actions.SET_LOCATION; data: string }
  | { type: Actions.INITIALISE };

export const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case Actions.SET_LOCATION:
      return { ...state, location: action.data };

    default:
      return state;
  }
};
