import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "~/util/constants";

import type { AuthSessionStorage } from "../ensembles/ensemble-service";
import type { User } from "./types";

export const UserService = {
  async getUserById({ userId }: { userId: string }) {
    const { data } = await axios.get<User>(
      `/v1/users/${userId}`,
      createAxiosConfig(),
    );
    return data;
  },

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

  async deleteUser() {
    await axios.delete("/v1/users", createAxiosConfig());
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
