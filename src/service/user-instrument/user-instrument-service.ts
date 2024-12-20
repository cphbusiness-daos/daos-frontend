import axios, { type AxiosRequestConfig } from "axios";
import { type z } from "zod";

import { type CreateUserInstrumentSchema } from "~/routes/instruments/create";
import { API_BASE_URL } from "~/util/constants";

import { type AuthSessionStorage } from "../ensembles/ensemble-service";
import { type UserInstrument } from "./types";

export const UserInstrumentService = {
  async getUserInstruments() {
    try {
      const { data } = await axios.get<{
        data: UserInstrument[];
        length: number;
      }>(`/v1/user-instruments/`, createAxiosConfig());
      return data;
    } catch (error) {
      return {
        data: [],
        length: 0,
      };
    }
  },

  async createUserInstrument(
    userInstrument: z.infer<typeof CreateUserInstrumentSchema>,
  ) {
    const { data } = await axios.post<UserInstrument>(
      `/v1/user-instruments/`,
      userInstrument,
      createAxiosConfig(),
    );
    return data;
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
