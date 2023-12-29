"use client";

import { Button, Card } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useRegisterStore } from "../stores/RegisterStore";

function PlanSelector() {
  const t = useTranslations("Page.Register.Step_2");
  const step = useRegisterStore((state) => state.step);

  return (
    <div className="flex justify-center mt-4 mb-12">
      <Card withBorder radius="lg" className="w-full max-w-[1000px]">
        <div className="flex flex-col md:flex-row gap-5 md:gap-2 p-0 md:p-3 ">
          <div className="flex gap-2 flex-col px-0 w-full">
            <h1 className="m-0 font-normal text-3xl md:text-4xl">
              {t("title")}
            </h1>
            <p className="m-0 opacity-75">{t("body_1")}</p>
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
