import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "~/util/constants";

import { type AuthSessionStorage } from "../ensembles/ensemble-service";

export const InstrumentService = {
  async getInstruments() {
    try {
      const { data } = await axios.get<{
        data: Array<{ _id: string; name: string }>;
        length: number;
      }>(`/v1/instruments/`, createAxiosConfig());
      return data;
    } catch (error) {
      return {
        data: [],
        length: 0,
      };
    }
  },
} as const;

function createAxiosConfig(): AxiosRequestConfig {
  const token = JSON.parse<AuthSessionStorage>(
    sessionStorage.getItem("auth-storage")!,
  )?.state?.token;

  return {
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    withCredentials: true,
    baseURL: API_BASE_URL,
  };
}
