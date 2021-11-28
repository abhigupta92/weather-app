import get from "lodash/get";

import axios from "axios";
import restClient from "../restClient";

import { CurrentLocation } from "./types";

const URL_GET_LOCATION = "";

const createAPI = () => {
  const instance = axios.create({
    baseURL: "https://api.ipregistry.co/?key=jm97urajrs2tx1vn",
    timeout: 1000,
  });
  return instance;
};

const getCurrentLocation = (): Promise<CurrentLocation> => {
  return restClient
    .get(createAPI(), URL_GET_LOCATION)
    .then((response) => {
      const { data } = response;
      const country = get(data, "location.country.name");
      const city = get(data, "location.city");
      return { country, city };
    })
    .catch((err) => {
      throw err;
    });
};

export default { getCurrentLocation };
