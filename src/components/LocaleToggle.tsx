"use client";

import { useTransition } from "react";
import { Radio, Select, Stack } from "@mantine/core";
import { usePathname, useRouter } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export default function LocaleToggle({
  locale,
  languageOptions,
  variant = "default",
}: {
  locale: string;
  languageOptions: { label: string; value: string }[];
  variant?: "default" | "dropdown";
}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Language");

  function onSelectChange(value: string) {
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  }

  return variant === "default" ? (
    <>
      <Select
        aria-label="Select application locale"
        className={`max-w-[180px] w-[80px]`}
        classNames={{
          input:
            "rounded-lg font-semibold text-stockwave dark:text-stockwave-dark",
          dropdown: "rounded-lg",
        }}
        data={languageOptions}
        value={locale}
        disabled={isPending}
        variant="filled"
        size="sm"
        onChange={(val) => {
          if (locale !== val) {
            onSelectChange(val!);
          }
        }}
        allowDeselect={false}
        rightSection={
          <i className="ti ti-language text-lg text-stockwave dark:text-stockwave-dark"></i>
        }
      />
    </>
  ) : (
    <>
      <Stack className="my-2">
        {languageOptions.map((opt, idx) => (
          <Radio
            size="xs"
            key={idx}
            checked={opt.value === locale}
            onChange={() => onSelectChange(opt.value)}
            label={t(`${opt.value}_dropdown`)}
            classNames={{
              label: "cursor-pointer",
            }}
          />
        ))}
      </Stack>
    </>
  );
}
