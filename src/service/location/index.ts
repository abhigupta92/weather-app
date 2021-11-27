import { Dispatch } from "react";

import get from "lodash/get";

import axios, { AxiosResponse } from "axios";
import restClient from "../restClient";

import { Action, Actions } from "../../context/reducer";

const URL_GET_LOCATION = "";

const createAPI = () => {
  const instance = axios.create({
    baseURL: "https://api.ipregistry.co/?key=jm97urajrs2tx1vn",
    timeout: 1000,
  });
  return instance;
};

const getCurrentLocation = (dispatch: Dispatch<Action>) =>
  restClient
    .get(createAPI(), URL_GET_LOCATION)
    .then((response: AxiosResponse) => {
      const { data } = response;
      const country = get(data, "location.country.name");
      const city = get(data, "location.city");
      dispatch({ type: Actions.SET_LOCATION, data: `${country}, ${city}` });
    });

export default { getCurrentLocation };
