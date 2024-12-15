import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "~/util/constants";

import type { AuthSessionStorage } from "../ensembles/ensemble-service";
import type { User } from "./types";

export const UserService = {
  async updateUser(reqBody: {
    fullName?: string;
    newsletterOptIn?: boolean;
    address?: string;
    phoneNumber?: string;
    bio?: string;
    birthDate?: string;
  }) {
    const { data } = await axios.put<User>(
      "/v1/users",
      reqBody,
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
