"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type UserContextType = {
  userData: UserProviderDataType | null;
  setUserData: Dispatch<SetStateAction<UserProviderDataType | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: UserProviderDataType | null;
}) {
  const [userData, setUserData] = useState(value);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be within UserProvider");
  }

  return context;
}
