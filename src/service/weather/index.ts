import axios, { AxiosResponse } from "axios";
import restClient from "../restClient";

const config = { key: "b5eee329235c4e16b01143510212611" };

const URL_GET_LOCATION_SUGGESTIONS = "search.json";

const createAPI = () => {
  const instance = axios.create({
    baseURL: "http://api.weatherapi.com/v1",
    timeout: 1000,
  });
  return instance;
};

const getLocationSuggestions = (
  searchQuery: string
): Promise<AxiosResponse<any, any>> =>
  restClient.get(createAPI(), URL_GET_LOCATION_SUGGESTIONS, {
    ...config,
    q: searchQuery,
  });

export default { getLocationSuggestions };
