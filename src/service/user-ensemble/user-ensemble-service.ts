import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "~/util/constants";

import { type AuthSessionStorage } from "../ensembles/ensemble-service";

export const UserEnsembleService = {
  async getUserEnsemble({ ensembleId }: { ensembleId: string }) {
    try {
      const { data } = await axios.get<{
        _id: string;
        user_id: string;
        ensemble_id: string;
        created_at: string;
        __v: string;
      }>(`/v1/user-ensembles/ensembles/${ensembleId}`, createAxiosConfig());
      return data;
    } catch (error) {
      return null;
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
