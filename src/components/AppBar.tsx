"use client";

import { ActionIcon, Drawer, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import LocaleToggle from "./LocaleToggle";
import { useLocale, useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logoutUser } from "@/services/authService";
import { showError } from "@/services/errorHandler";
import { useRouter } from "@/lib/navigation";

type AppBarProps = {
  withSidebar?: boolean;
  withAuth?: boolean;
};

function AppBar({ withSidebar = true, withAuth = false }: AppBarProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const locale = useLocale();
  const tError = useTranslations("ErrorHandler");
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
  const mutation = useMutation({
    mutationFn: logoutUser,
    onError: (error) => {
      showError(tError("modal_title"), error);
    },
    onSuccess: (data) => {
      router.refresh();
    },
  });

  return (
    <React.Fragment>
      <div
        style={withSidebar ? { backdropFilter: "blur(20px)" } : {}}
        className={`drop-shadow rounded-lg px-2 py-2 h-14 ${
          withSidebar
            ? "bg-slate-200/70 dark:bg-slate-800/70 sticky z-10"
            : "bg-transparent mb-4"
        } top-0 w-screen transition-width max-w-full flex justify-between items-center `}
      >
        <div className="ml-2 flex gap-2">
          <ActionIcon
            variant="transparent"
            aria-label="Open sidebar"
            className={`${withSidebar ? "block" : "hidden"} md:hidden`}
            onClick={() => open()}
          >
            <i className={`ti ti-menu-2 text-lg`} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            aria-label="logout"
            className={`${withAuth ? "block" : "hidden"}`}
            onClick={() => mutation.mutate()}
          >
            <i className={`ti ti-logout text-lg`} />
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
