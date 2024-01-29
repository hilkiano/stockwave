"use client";

import { Button, Card, Checkbox } from "@mantine/core";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRegisterStore } from "../stores/RegisterStore";
import { useLocalStorage } from "@mantine/hooks";
import PlanCard from "./PlanCard";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/registerService";
import { showError } from "@/services/errorHandler";
import { useRouter } from "@/lib/navigation";

function ReviewCard() {
  const router = useRouter();
  const step = useRegisterStore((state) => state.step);
  const tError = useTranslations("ErrorHandler");
  const t = useTranslations("Page.Register.Step_3");
  const [checked, setChecked] = useState(false);

  type RegDataType = {
    choosed_plan: PlansModelType;
    form_data: {
      business_name: string;
      business_email: string;
      business_phone: string;
      business_address: string;
      personal_name: string;
      personal_email: string;
      personal_phone: string;
      personal_address: string;
    };
  };

  const [regData, setRegData] = useLocalStorage<RegDataType | null>({
    key: "registration-data",
    defaultValue: null,
  });

  const mutation = useMutation({
    mutationFn: (payload: RegDataType) => registerUser(payload),
    onError: (error) => {
      showError(tError("modal_title"), error);
    },
    onSuccess: () => {
      setRegData(null);
      router.push("/");
    },
  });

  return (
    <div className="flex justify-center mt-4 mb-12">
      <Card withBorder radius="lg" className="w-full max-w-[650px]">
        <div className="flex flex-col md:flex-row gap-5 md:gap-2 p-0 md:p-3 ">
          <div className="flex gap-2 flex-col px-0 w-full">
            <h1 className="m-0 font-normal text-3xl md:text-4xl">
              {t("title")}
            </h1>
            <p className="m-0 opacity-75 mb-4">{t("body_1")}</p>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <i className="ti ti-building-store text-2xl"></i>
                <h3 className="my-0 text-2xl font-semibold">{t("business")}</h3>
              </div>
              <div className="grid grid-rows-1 md:grid-cols-2">
                <div className="flex flex-col">
                  <p className="my-0 text-xs opacity-75">{t("name")}</p>
                  <p className="my-0">{regData?.form_data.business_name}</p>
                </div>
              </div>
              <div className="grid grid-rows-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <p className="my-0 text-xs opacity-75">{t("email")}</p>
                  <p className="my-0">{regData?.form_data.business_email}</p>
                </div>
                <div className="flex flex-col">
                  <p className="my-0 text-xs opacity-75">{t("phone_number")}</p>
                  <p className="my-0">{regData?.form_data.business_phone}</p>
                </div>
              </div>
              <div className="grid grid-rows-1 md:grid-cols-2">
                <div className="flex flex-col">
                  <p className="my-0 text-xs opacity-75">{t("address")}</p>
                  <p className="my-0">{regData?.form_data.business_address}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-3">
              <div className="flex items-center gap-2">
                <i className="ti ti-user text-2xl"></i>
                <h3 className="my-0 text-2xl font-semibold">{t("owner")}</h3>
              </div>
              <div className="grid grid-rows-1 md:grid-cols-2">
                <div className="flex flex-col">
                  <p className="my-0 text-xs opacity-75">{t("name")}</p>
                  <p className="my-0">{regData?.form_data.personal_name}</p>
                </div>
              </div>
              <div className="grid grid-rows-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <p className="my-0 text-xs opacity-75">{t("email")}</p>
                  <p className="my-0">{regData?.form_data.personal_email}</p>
                </div>
                <div className="flex flex-col">
                  <p className="my-0 text-xs opacity-75">{t("phone_number")}</p>
                  <p className="my-0">{regData?.form_data.personal_phone}</p>
                </div>
              </div>
              <div className="grid grid-rows-1 md:grid-cols-2">
                <div className="flex flex-col">
                  <p className="my-0 text-xs opacity-75">{t("address")}</p>
                  <p className="my-0">{regData?.form_data.personal_address}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-3">
              <div className="flex items-center gap-2">
                <i className="ti ti-file-certificate text-2xl"></i>
                <h3 className="my-0 text-2xl font-semibold">{t("plan")}</h3>
              </div>
              {regData?.choosed_plan && (
                <PlanCard plan={regData?.choosed_plan} />
              )}
            </div>
            <div className="flex flex-col my-5 items-center">
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                label={t("tnc_checkbox")}
              />
            </div>
            <div className="flex justify-between">
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
                rightSection={<i className="ti ti-send-2"></i>}
                variant="filled"
                disabled={!checked}
                loading={mutation.isPending}
                onClick={() => {
                  mutation.mutate(regData!);
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

export default ReviewCard;
