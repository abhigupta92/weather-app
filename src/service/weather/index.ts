import axios, { AxiosResponse } from "axios";

import restClient from "../restClient";

import { ForecastWeather } from "./types";

const config = { key: "b5eee329235c4e16b01143510212611" };

export const URL_GET_LOCATION_SUGGESTIONS = "search.json";
export const URL_FORECAST_WEATHER = "forecast.json";

const createAPI = () => {
  const instance = axios.create({
    baseURL: "http://api.weatherapi.com/v1",
    timeout: 1000,
  });
  return instance;
};
const createQueryParams = (params: object): object => {
  return { ...config, ...params };
};

const getLocationSuggestions = (
  searchQuery: string
): Promise<AxiosResponse<any, any>> =>
  restClient.get(
    createAPI(),
    URL_GET_LOCATION_SUGGESTIONS,
    createQueryParams({ q: searchQuery })
  );

const getCurrentWeather = (searchQuery: string): Promise<ForecastWeather> =>
  restClient
    .get(
      createAPI(),
      URL_FORECAST_WEATHER,
      createQueryParams({ q: searchQuery, days: 1, aqi: "no", alerts: "yes" })
    )
    .then((response: AxiosResponse<any, any>) => {
      const data: ForecastWeather = response.data;
      return data;
    })
    .catch((err) => {
      throw err;
    });

const service = { getLocationSuggestions, getCurrentWeather };

export default service;
