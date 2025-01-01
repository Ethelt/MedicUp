import axios, { AxiosInstance } from "axios";

type DefaultError = {
  message: string;
};

export class Api {
  private static _axios: AxiosInstance;

  private static get axios() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) throw new Error("VITE_BACKEND_URL is not set");

    if (!Api._axios) {
      Api._axios = axios.create({
        baseURL: backendUrl,
        withCredentials: true,
      });
    }
    return Api._axios;
  }

  public static async get<TParams, TResponse, TError = DefaultError>(
    route: string,
    params: TParams
  ) {
    try {
      const result = await this.axios.get(route, { params });
      return { ok: true, data: result.data as TResponse } as const;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;

      if (error.status && error.status >= 400 && error.status < 500) {
        return {
          ok: false,
          error: error.response?.data as TError | DefaultError,
        } as const;
      }

      throw error;
    }
  }

  public static async post<TBody, TResponse, TError = DefaultError>(
    route: string,
    body: TBody
  ) {
    try {
      const result = await this.axios.post(route, body);
      return { ok: true, data: result.data as TResponse } as const;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;

      if (error.status && error.status >= 400 && error.status < 500) {
        return {
          ok: false,
          error: error.response?.data as TError | DefaultError,
        } as const;
      }

      throw error;
    }
  }
}
