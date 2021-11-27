import { Dispatch } from "react";

import axios, { AxiosResponse } from "axios";
import restClient from "../restClient";

import { Action, Actions } from "../../context/reducer";

const URL_GET_LOCATION = "";

const createAPI = () => {
  const instance = axios.create({
    baseURL: "https://api.ipregistry.co/?key=tryout",
    timeout: 1000,
  });
  return instance;
};

const getCurrentLocation = (dispatch: Dispatch<Action>) =>
  restClient
    .get(createAPI(), URL_GET_LOCATION)
    .then((response: AxiosResponse) => {
      console.log("Response", response);
      dispatch({ type: Actions.SET_LOCATION, data: response.data });
    });

export default { getCurrentLocation };
