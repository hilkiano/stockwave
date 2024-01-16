"use client";

import { Center, Stepper } from "@mantine/core";
import React, { useEffect } from "react";
import { useRegisterStore } from "../stores/RegisterStore";
import { useTranslations } from "next-intl";
import RegisterForm from "./RegisterForm";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import PlanSelector from "./PlanSelector";
import ReviewCard from "./ReviewCard";

function RegisterStep() {
  const step = useRegisterStore((state) => state.step);
  const t = useTranslations("Page.Register.Stepper");
  const matches = useMediaQuery("(min-width: 1024px)", true, {
    getInitialValueInEffect: false,
  });
  const [regData, setRegData] = useLocalStorage({
    key: "registration-data",
    defaultValue: null,
  });

  useEffect(() => {
    if (regData) {
      if ("choosed_plan" in regData) {
        useRegisterStore.setState({ step: 2 });
      } else if ("form_data" in regData) {
        useRegisterStore.setState({ step: 1 });
      }
    }
  }, [regData]);

  return (
    <Center className="">
      <div className="w-full max-w-[1200px] mx-2 md:mx-4">
        <Stepper
          active={step}
          allowNextStepsSelect={false}
          completedIcon={<i className="ti ti-check text-2xl"></i>}
        >
          <Stepper.Step
            icon={<i className="ti ti-user text-2xl"></i>}
            label={matches ? t("title_step_1") : null}
            description={matches ? t("subtitle_step_1") : null}
          >
            <RegisterForm />
          </Stepper.Step>
          <Stepper.Step
            icon={<i className="ti ti-file-certificate text-2xl"></i>}
            label={matches ? t("title_step_2") : null}
            description={matches ? t("subtitle_step_2") : null}
          >
            <PlanSelector />
          </Stepper.Step>
          <Stepper.Step
            icon={<i className="ti ti-zoom-check text-2xl"></i>}
            label={matches ? t("title_step_3") : null}
            description={matches ? t("subtitle_step_3") : null}
          >
            <ReviewCard />
          </Stepper.Step>
        </Stepper>
      </div>
    </Center>
  );
}

export default RegisterStep;
