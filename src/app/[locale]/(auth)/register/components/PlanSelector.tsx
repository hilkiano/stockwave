"use client";

import { Button, Card } from "@mantine/core";
import { useTranslations } from "next-intl";
import {
  useRegisterStore,
  useSelectedPlanStore,
} from "../stores/RegisterStore";
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "@/services/planService";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { showError } from "@/services/errorHandler";
import PlanCard from "./PlanCard";

function PlanSelector() {
  const {
    data: plansData,
    isLoading,
    isError,
    error: plansError,
  } = useQuery<JsonSuccessResponseType<ListResultType<PlansModelType>>>({
    queryKey: ["plans"],
    queryFn: getPlans,
    retry: false,
  });

  const tError = useTranslations("ErrorHandler");
  const t = useTranslations("Page.Register.Step_2");
  const step = useRegisterStore((state) => state.step);
  const selectedPlan = useSelectedPlanStore((state) => state.selectedPlan);

  type RegDataType = {
    choosed_plan?: PlansModelType;
  };

  const [regData, setRegData] = useLocalStorage<RegDataType | null>({
    key: "registration-data",
    defaultValue: null,
  });

  const selectPlan = (plan: PlansModelType) => {
    useSelectedPlanStore.setState({ selectedPlan: plan });
  };

  useEffect(() => {
    if (regData) {
      if (!isLoading) {
        if ("choosed_plan" in regData) {
          useSelectedPlanStore.setState({ selectedPlan: regData.choosed_plan });
        }
      }
    }
  }, [regData, isLoading]);

  useEffect(() => {
    if (isError) {
      showError(tError("modal_title"), plansError);
    }
  }, [isError, plansError, tError]);

  return (
    <div className="flex justify-center mt-4 mb-12">
      <Card withBorder radius="lg" className="w-full max-w-[1100px]">
        <div className="flex flex-col md:flex-row gap-5 md:gap-2 p-0 md:p-3 ">
          <div className="flex gap-2 flex-col px-0 w-full">
            <h1 className="m-0 font-normal text-3xl md:text-4xl">
              {t("title")}
            </h1>
            <p className="m-0 opacity-75 mb-4">{t("body_1")}</p>
            {/* ITERATE PLANS */}
            {isLoading && (
              <div className="grid grid-rows-1 lg:grid-cols-4 gap-3">
                {Array.from(Array(4).keys()).map((e, idx) => (
                  <div
                    key={idx}
                    className="w-full h-[150px] lg:h-[300px] bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            )}
            {isError && (
              <h4 className="opacity-80 text-center font-normal">
                {t.rich("api_error", {
                  red: () => (
                    <span className="text-red-500 dark:text-red-400">
                      {plansError.message}
                    </span>
                  ),
                })}
              </h4>
            )}
            {!isError && (
              <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {plansData?.result.rows
                  .filter((plan) => plan.is_public)
                  .map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      selectFn={() => selectPlan(plan)}
                    />
                  ))}
              </div>
            )}

            <div className="flex mt-4 justify-between">
              <Button
                onClick={() => useRegisterStore.setState({ step: step - 1 })}
                size="xs"
                leftSection={<i className="ti ti-arrow-big-left"></i>}
                variant="subtle"
              >
                {t("btn_back")}
              </Button>
              <Button
                type="submit"
                size="xs"
                rightSection={<i className="ti ti-arrow-big-right"></i>}
                variant="filled"
                disabled={!selectedPlan || isError}
                onClick={() => {
                  if (regData) {
                    if (
                      Object.keys(regData).length !== 0 &&
                      regData.constructor === Object
                    ) {
                      setRegData({ ...regData, choosed_plan: selectedPlan! });
                    }
                  }
                }}
              >
                {t("btn_next")}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PlanSelector;
