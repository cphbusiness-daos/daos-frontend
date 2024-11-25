import axios from "axios";

import type { Ensemble } from "./types";

export const EnsembleService = {
  async getEnsembles() {
    const { data } = await axios.get<Ensemble[]>("/api/v1/ensembles");
    return data;
  },

  async getUserEnsembles({ userId }: { userId: string }) {
    try {
      const { data } = await axios.get<Ensemble[]>(
        `/api/v1/ensembles/users/${userId}`,
        {
          headers: {},
        },
      );
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
} as const;
