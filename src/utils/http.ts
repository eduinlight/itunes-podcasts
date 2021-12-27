import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.headers.common["Content-type"] = "application/json";

export const Http = axios;

export type HttpResponse = AxiosResponse;

export type HttpResponseError = AxiosError;
