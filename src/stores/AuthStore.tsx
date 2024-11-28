import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useSession = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: "" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
