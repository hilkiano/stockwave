import { Card, Text, List, ThemeIcon } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useMantineColorScheme } from "@mantine/core";
import React from "react";
import { priceFormatter } from "@/lib/utils";
import { useSelectedPlanStore } from "../stores/RegisterStore";

function PlanCard({
  plan,
  selectFn,
}: {
  plan: PlansModelType;
  selectFn?: () => void;
}) {
  const t = useTranslations("Page.Register.Step_2");
  const { colorScheme } = useMantineColorScheme();
  const selectedPlan = useSelectedPlanStore((state) => state.selectedPlan);
  const PlanTitle = ({ name }: { name: string }) => {
    switch (name) {
      case "plan_free":
        return (
          <Text
            className="font-black text-3xl"
            variant="gradient"
            gradient={{
              from:
                colorScheme === "light" ? "rgb(64 64 64)" : "rgb(212 212 212)",
              to:
                colorScheme === "light" ? "rgb(82 82 82)" : "rgb(229 229 229)",
              deg: 145,
            }}
          >
            {t(name)}
          </Text>
        );
      case "plan_silver":
        return (
          <Text
            className="font-black text-3xl"
            variant="gradient"
            gradient={{
              from:
                colorScheme === "light" ? "rgb(29 78 216)" : "rgb(59 130 246)",
              to:
                colorScheme === "light" ? "rgb(3 105 161)" : "rgb(14 165 233)",
              deg: 145,
            }}
          >
            {t(name)}
          </Text>
        );
      case "plan_gold":
        return (
          <Text
            className="font-black text-3xl"
            variant="gradient"
            gradient={{
              from:
                colorScheme === "light" ? "rgb(249 115 22)" : "rgb(251 146 60)",
              to:
                colorScheme === "light" ? "rgb(245 158 11)" : "rgb(251 191 36)",
              deg: 145,
            }}
          >
            {t(name)}
          </Text>
        );
      case "plan_platinum":
        return (
          <Text
            className="font-black text-3xl"
            variant="gradient"
            gradient={{
              from: "rgb(161 161 170)",
              to: "rgb(212 212 216)",
              deg: 145,
            }}
          >
            {t(name)}
          </Text>
        );
      default:
        return <h1 className="font-black my-0">Unknown</h1>;
    }
  };

  const PlanConfigs = ({ configs }: { configs: PlansModelConfigType }) => {
    return (
      <List
        spacing="xs"
        size="sm"
        icon={
          <ThemeIcon
            variant="transparent"
            color="stockwave"
            size={24}
            radius="xl"
          >
            <i className="ti ti-circle-check-filled text-lg"></i>
          </ThemeIcon>
        }
        className="mt-2"
      >
        {configs &&
          Object.keys(configs).map((key: string) => {
            const hiddenKeys = ["is_best_value", "monthly_price_rp"];

            if (!hiddenKeys.includes(key)) {
              const property = key as keyof PlansModelConfigType;
              return (
                <List.Item key={key}>
                  {t(property, { value: configs[property] })}
                </List.Item>
              );
            }
          })}
      </List>
    );
  };

  return (
    <Card
      onClick={selectFn}
      withBorder
      className={`relative ${
        selectFn ? "cursor-pointer hover:shadow-lg" : ""
      } transition-all border-4 ${
        plan.id === selectedPlan?.id && selectFn
          ? "border-stockwave dark:!border-stockwave-dark"
          : ""
      }`}
    >
      {plan.configs.is_best_value && selectFn && (
        <div className="absolute top-2 right-2 bg-stockwave dark:bg-stockwave-dark rounded-lg">
          <p className="my-0 text-white text-xs px-3 py-1 font-semibold uppercase">
            {t("best_choice")}
          </p>
        </div>
      )}
      <PlanTitle name={plan.name} />
      <p className="my-0 text-xs opacity-80 text-pretty">
        {t(plan.description)}
      </p>
      <h3 className="my-0 mt-1 opacity-80 font-semibold">
        {priceFormatter(plan.configs.monthly_price_rp)}
        <span className="text-xs">{t("per_month")}</span>
      </h3>
      <PlanConfigs configs={plan.configs} />
    </Card>
  );
}

export default PlanCard;
