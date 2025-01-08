import axios, { AxiosInstance } from "axios";
import { parseISO } from "date-fns";

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
      Api._axios.interceptors.response.use((originalResponse) => {
        handleDates(originalResponse.data);
        return originalResponse;
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

  public static async delete<TBody, TResponse, TError = DefaultError>(
    route: string,
    body: TBody
  ) {
    try {
      const result = await this.axios.delete(route, { data: body });
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

  public static async patch<TBody, TResponse, TError = DefaultError>(
    route: string,
    body: TBody
  ) {
    try {
      const result = await this.axios.patch(route, body);
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

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;

function isIsoDateString(value: unknown): boolean {
  return !!value && typeof value === "string" && isoDateFormat.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = parseISO(value);
    else if (typeof value === "object") handleDates(value);
  }
}
