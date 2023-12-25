"use client";

import { useTransition } from "react";
import { Select } from "@mantine/core";
import { usePathname, useRouter } from "@/lib/navigation";

export default function LocaleToggle({
  locale,
  languageOptions,
}: {
  locale: string;
  languageOptions: { label: string; value: string }[];
}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  function onSelectChange(value: string) {
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  }

  return (
    <>
      <Select
        aria-label="Select application locale"
        className="max-w-[180px] w-[80px]"
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
  );
}
