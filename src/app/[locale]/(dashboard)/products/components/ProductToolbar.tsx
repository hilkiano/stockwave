"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, TextInput } from "@mantine/core";
import { useTranslations } from "next-intl";

const ProductToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const t = useTranslations("Page.Products");
  const [value, setValue] = useState("");
  return (
    <div
      ref={ref}
      className={cn(
        "p-3 rounded-lg w-full bg-slate-300/40 dark:bg-slate-800/50 flex flex-col md:flex-row gap-3 md:gap-4 justify-between",
        className
      )}
      {...props}
    >
      <TextInput
        leftSection={<i className="ti ti-search text-lg"></i>}
        placeholder={t("search_placeholder")}
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        className="grow md:max-w-[400px]"
      />
      <Button
        variant="gradient"
        gradient={{ from: "stockwave", to: "tomato", deg: 145 }}
        radius="md"
        leftSection={<i className="ti ti-plus text-lg"></i>}
      >
        {t("add_product_btn")}
      </Button>
    </div>
  );
});

ProductToolbar.displayName = "ProductToolbar";

export default ProductToolbar;
