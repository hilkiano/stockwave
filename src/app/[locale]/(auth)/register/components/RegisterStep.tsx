"use client";

import { Center, Stepper } from "@mantine/core";
import React from "react";
import { useRegisterStore } from "../stores/RegisterStore";
import { useTranslations } from "next-intl";
import RegisterForm from "./RegisterForm";
import { useMediaQuery } from "@mantine/hooks";
import PlanSelector from "./PlanSelector";
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "@/services/planService";

function RegisterStep() {
  const { data, error } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const step = useRegisterStore((state) => state.step);
  const t = useTranslations("Page.Register.Stepper");
  const matches = useMediaQuery("(min-width: 920px)", true, {
    getInitialValueInEffect: false,
  });

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
          ></Stepper.Step>
        </Stepper>
      </div>
    </Center>
  );
}

export default RegisterStep;
