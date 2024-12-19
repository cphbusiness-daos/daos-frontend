import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "~/util/constants";

import type { AuthSessionStorage } from "../ensembles/ensemble-service";
import type { User } from "./types";

export const AuthService = {
  async getLoggedInUser() {
    const { data } = await axios.get<User>("/v1/auth/me", createAxiosConfig());
    return data;
  },

  async login({ email, password }: { email: string; password: string }) {
    const { data } = await axios.post<{ token: string }>(
      "/v1/auth/login",
      {
        email,
        password,
      },
      createAxiosConfig(),
    );
    return data;
  },

  async signUp(reqBody: {
    email: string;
    password: string;
    fullName: string;
    acceptedToc: boolean;
    newsletterOptInAt?: boolean;
  }) {
    const { data } = await axios.post<{ token: string }>(
      "/v1/auth/signup",
      reqBody,
      createAxiosConfig(),
    );
    return data;
  },

  async updatePassword(reqBody: { password: string; newPassword: string }) {
    await axios.post("/v1/auth/reset-password", reqBody, createAxiosConfig());
  },

  async signOut() {
    await axios.post("/v1/auth/logout", null, createAxiosConfig());
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
