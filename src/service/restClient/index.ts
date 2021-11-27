import { AxiosInstance, AxiosResponse } from "axios";

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
  return axios.get(url, { params });
};

export default { get };
