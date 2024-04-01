import {
  getAccessToken,
  removeFromStorage,
} from "@/services/auth-token.service";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { errorCatch } from "./error";
import { authService } from "@/services/auth.service";

type AxiosRequestHeaders = {
  [x: string]: string | number | boolean;
};

interface Props<Req, Params> {
  url: string;
  method?: string;
  prefix?: string;
  options?: {
    isNotRequest?: boolean;
    data?: Req;
    headers?: AxiosRequestHeaders;
    id?: string;
    isAuth?: boolean;
    params?: Params;
  };
  responseType?: ResponseType;
  progressFnUp?: (process: number) => void;
  progressFnDw?: (process: number) => void;
}

const axiosClassic = axios.create();

const axiosWithAuth = axios.create();
axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") removeFromStorage();
      }
    }

    throw error;
  }
);

const requestBuilder = <Res, Req, Params = undefined>({
  url,
  method,
  options,
  responseType,
  prefix,
  progressFnUp,
  progressFnDw,
}: Props<Req, Params>): Promise<AxiosResponse<Res>> => {
  const config: AxiosRequestConfig = {
    baseURL: prefix
      ? "http://localhost:5555/api/" + prefix
      : "http://localhost:5555/api/",
    method,
    url,
    withCredentials: true,
    data: options?.data,
    params: options?.params,
    headers: {
      ...options?.headers,
    },
    onUploadProgress: (progressEvent: any) => {
      let percentComplete: number = progressEvent.loaded / progressEvent.total;
      percentComplete = percentComplete * 100;
      if (progressFnUp) {
        progressFnUp(percentComplete);
      }
    },
    onDownloadProgress: (progressEvent: any) => {
      let percentComplete: number = progressEvent.loaded / progressEvent.total;
      percentComplete = percentComplete * 100;
      if (progressFnDw) {
        progressFnDw(percentComplete);
      }
    },
  };

  return options?.isAuth ? axiosWithAuth(config) : axiosClassic(config);
};

export default requestBuilder;
