import { create } from "zustand";

export const useRegisterStore = create<{ step: number }>((set) => ({
  step: 0,
}));

export const useSelectedPlanStore = create<{
  selectedPlan: PlansModelType | null;
}>((set) => ({
  selectedPlan: null,
}));
