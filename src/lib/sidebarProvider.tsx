"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export default function SidebarProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: boolean;
}) {
  const [collapsed, setCollapsed] = useState(value);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be within SidebarProvider");
  }

  return context;
}
