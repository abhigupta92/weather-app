import { AxiosInstance, AxiosResponse } from "axios";

/**
 * @param {AxiosInstance} axios URL to request
 * @param {string} url URL to request
 * @param {object} params Params to be appended
 */
const get = (
  axios: AxiosInstance,
  url: string,
  params?: object
): Promise<AxiosResponse<unknown, unknown>> => axios.get(url, { params });

export default { get };
