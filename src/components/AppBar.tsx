"use client";

import { ActionIcon, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import LocaleToggle from "./LocaleToggle";
import { useLocale, useTranslations } from "next-intl";

type AppBarProps = {
  withSidebar?: boolean;
};

function AppBar({ withSidebar = true }: AppBarProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const locale = useLocale();
  const t = useTranslations("Language");
  const languageOptions = [
    {
      label: t("id"),
      value: "id",
    },
    {
      label: t("en"),
      value: "en",
    },
  ];
  return (
    <React.Fragment>
      <div
        style={{ backdropFilter: "blur(20px)" }}
        className={`drop-shadow rounded-lg px-2 py-2 h-14 bg-slate-200/70 dark:bg-slate-800/70 sticky top-0 w-screen transition-width max-w-full flex justify-between items-center z-10`}
      >
        <div className="ml-2">
          <ActionIcon
            variant="transparent"
            aria-label="Open sidebar"
            className={`${withSidebar ? "block" : "hidden"} md:hidden`}
            onClick={() => open()}
          >
            <i className={`ti ti-menu-2 text-lg`} />
          </ActionIcon>
        </div>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <LocaleToggle locale={locale} languageOptions={languageOptions} />
        </div>
      </div>

      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        classNames={{
          content: "max-w-[260px]",
          body: "p-0 h-full",
        }}
        overlayProps={{ blur: 6 }}
      >
        <Sidebar withToggle={false} />
      </Drawer>
    </React.Fragment>
  );
}

export default AppBar;
