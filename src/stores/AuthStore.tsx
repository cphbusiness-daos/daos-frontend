import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  token: string;
  session: { user: User } | null;
  setSession: (token: string) => void;
  clearSession: () => void;
};

type User = {
  id: string;
  email: string;
};

export const useSession = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      session: null,
      setSession: (token: string) => {
        set({ token });
        const user = parseToken(token);
        set({ session: { user } });
      },
      clearSession: () => {
        set({ token: "" });
        set({ session: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

function parseToken(token: string): User {
  const [, payload] = token.split(".");
  const decoded = atob(payload);
  const { sub, email } = JSON.parse<{ sub: string; email: string }>(decoded);
  return {
    id: sub,
    email,
  };
}

export const getSession = () => useSession.getState().token;
