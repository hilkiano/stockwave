"use client";

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";

export default function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
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
  );
}
