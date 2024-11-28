import axios, { type AxiosRequestConfig } from "axios";

import type { AuthSessionStorage } from "../ensembles/ensemble-service";
import type { User } from "./types";

export const AuthService = {
  async getLoggedInUser() {
    const { data } = await axios.get<User>(
      "/api/v1/auth/me",
      createAxiosConfig(),
    );
    return data;
  },

  async login({ email, password }: { email: string; password: string }) {
    const { data } = await axios.post<{ token: string }>("/api/v1/auth/login", {
      email,
      password,
    });
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
      "/api/v1/auth/signup",
      reqBody,
    );
    return data;
  },

  async signOut() {
    await axios.post("/api/v1/auth/logout", null, createAxiosConfig());
  },
} as const;

function createAxiosConfig(): AxiosRequestConfig {
  const { token } = JSON.parse<AuthSessionStorage>(
    sessionStorage.getItem("auth-storage")!,
  ).state;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };
}
