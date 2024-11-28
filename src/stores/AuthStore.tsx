import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthStore = {
  token: string;
  session: { user: User } | null;
  setSession: (token: string) => void;
  clearSession: () => void;
};

type User = {
  id: string;
  email: string;
};

const useDevSession = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      session: null,
      setSession: (token: string) => {
        set({ token });
        set({ session: parseToken(token) });
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

function parseToken(token: string): { user: User } {
  if (!token) {
    // @ts-expect-error this is a dev-only function
    return null;
  }
  const [, payload] = token.split(".");
  const decoded = atob(payload);
  const { sub, email } = JSON.parse<{ sub: string; email: string }>(decoded);
  return {
    user: {
      id: sub,
      email,
    },
  };
}

// const useProdSession = create<AuthStore>()(() => ({
//   token:
//     document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("auth"))
//       ?.split("=")[1] ?? "",
//   session: parseToken(
//     document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("auth"))
//       ?.split("=")[1] ?? "",
//   ),
//   setSession: () => void 0,
//   clearSession: () =>
//     (document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"),
// }));

export const useSession =
  import.meta.env.MODE === "production" ? useDevSession : useDevSession;
