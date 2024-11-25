import axios from "axios";

import type { Ensemble } from "./types";

export const EnsembleService = {
  async getEnsembles({ page = 1 }: { page: number }) {
    try {
      const { data } = await axios.get<{
        data: Ensemble[];
        length: number;
      }>("/api/v1/ensembles", {
        params: { page },
        headers: {},
      });
      return data;
    } catch (error) {
      return {
        data: [],
        length: 0,
      };
    }
  },

  async getUserEnsembles({ userId }: { userId: string }) {
    try {
      const { data } = await axios.get<{
        data: Ensemble[];
        length: number;
      }>(`/api/v1/ensembles/users/${userId}`, {
        headers: {},
      });
      return data;
    } catch (error) {
      return {
        data: [],
        length: 0,
      };
    }
  },
} as const;
