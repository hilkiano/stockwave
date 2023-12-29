import { create } from "zustand";

type RegisterStore = {
  step: number;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  step: 0,
}));
