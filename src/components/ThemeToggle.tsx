"use client";

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Combobox,
} from "@mantine/core";
import { useTranslations } from "next-intl";

type ThemeToggleType = {
  variant?: "default" | "dropdown";
};

export default function ThemeToggle({ variant = "default" }: ThemeToggleType) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const t = useTranslations("Theme");

  return variant === "default" ? (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="transparent"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <i className="ti ti-sun text-lg light"></i>
      <i className="ti ti-moon text-lg dark"></i>
    </ActionIcon>
  ) : (
    <Combobox.Option
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      value="0"
      key={0}
    >
      <p className="my-0 flex gap-2 items-center">
        <i className="ti ti-sun text-lg light"></i>
        <i className="ti ti-moon text-lg dark"></i>
        {computedColorScheme === "light" ? t("dark") : t("light")}
      </p>
    </Combobox.Option>
  );
}
