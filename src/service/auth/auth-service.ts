import axios from "axios";

import type { User } from "./types";

export const AuthService = {
  async getLoggedInUser() {
    const { data } = await axios.get<User>("/api/v1/auth/me", {
      headers: {},
    });
    return data;
  },
} as const;
