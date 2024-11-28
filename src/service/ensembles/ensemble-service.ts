import axios, { type AxiosRequestConfig } from "axios";

import {
  type activeMusicians,
  API_BASE_URL,
  type genres as genreTypes,
  type practiceFrequency as practiceFrequencies,
} from "~/util/constants";

import type { Ensemble } from "./types";

export const EnsembleService = {
  async getEnsemble({ ensembleId }: { ensembleId: string }) {
    try {
      const { data } = await axios.get<Ensemble>(
        `/v1/ensembles/${ensembleId}`,
        createAxiosConfig(),
      );
      return data;
    } catch (error) {
      return null;
    }
  },

  async getEnsembles({ page = 1 }: { page: number }) {
    try {
      const { data } = await axios.get<{
        data: Ensemble[];
        length: number;
        total: number;
      }>("/v1/ensembles", {
        params: { page },
        ...createAxiosConfig(),
      });
      return data;
    } catch (error) {
      return {
        data: [],
        length: 0,
        total: 0,
      };
    }
  },

  async getUserEnsembles({ userId }: { userId: string }) {
    try {
      const { data } = await axios.get<{
        data: Ensemble[];
        length: number;
      }>(`/v1/ensembles/users/${userId}`, createAxiosConfig());
      return data;
    } catch (error) {
      return {
        data: [],
        length: 0,
      };
    }
  },

  async addUserToEnsemble({ ensembleId }: { ensembleId: string }) {
    try {
      const { data } = await axios.post<{ message: "OK" }>(
        `/v1/ensembles/${ensembleId}`,
        null,
        createAxiosConfig(),
      );
      return data;
    } catch (error) {
      return null;
    }
  },

  async createEnsemble(params: {
    name: string;
    imageUrl: string;
    description: string;
    homepage: string;
    zip: string;
    city: string;
    activeMusicians: (typeof activeMusicians)[number];
    practiceFrequency: (typeof practiceFrequencies)[number];
    ensembleTypes: Array<"continuous" | "project_based">;
    genre: Array<(typeof genreTypes)[number]>;
  }) {
    try {
      const { data } = await axios.post<Ensemble>(
        "/v1/ensembles",
        {
          ...params,
          website: params.homepage,
          zip_code: params.zip,
          active_musicians: params.activeMusicians,
          practice_frequency: params.practiceFrequency,
          ensemble_type: params.ensembleTypes,
        },
        createAxiosConfig(),
      );
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

export type AuthSessionStorage = {
  state: {
    token: string;
  };
};
