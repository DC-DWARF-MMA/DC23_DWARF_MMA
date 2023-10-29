import { createContext, useState, useMemo, useContext } from "react";

type UserContextType = {
  email: string | null;
  setEmail: (email: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);

  const ctx = useMemo(
    () => ({
      email: email,
      setEmail: setEmail,
    }),
    [email, setEmail]
  );
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
