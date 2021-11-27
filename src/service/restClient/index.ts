import axios, { AxiosInstance, AxiosResponse } from "axios";

const createAPI = () => {
  const instance = axios.create({
    baseURL: "http://api.weatherapi.com/v1",
    timeout: 1000,
  });
  return instance;
};

/**
 *
 * @param {*} url URL to request
 * @param {*} params Params to be appended
 */
const get = (
  axios: AxiosInstance,
  url: string,
  params?: object
): Promise<AxiosResponse<unknown, unknown>> => {
  return axios.get(url, params);
};

export default { get };
