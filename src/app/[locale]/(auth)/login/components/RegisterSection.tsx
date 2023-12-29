"use client";

import { Button } from "@mantine/core";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

function RegisterSection() {
  const t = useTranslations("Page.Login");

  return (
    <div className="flex gap-3 flex-col justify-center items-center text-center px-3 bg-slate-100 dark:bg-slate-900 p-7 md:p-3 mt-3 md:mt-0 rounded-xl">
      <h3 className="m-0 font-normal">{t("body_2")}</h3>
      <Button
        variant="gradient"
        gradient={{ from: "stockwave", to: "tomato", deg: 145 }}
        component={Link}
        href="/register"
        scroll={false}
        size="lg"
      >
        {t("btn_register")}
      </Button>
    </div>
  );
}

export default RegisterSection;
