"use client";

import {
  ActionIcon,
  Drawer,
  Button,
  Avatar,
  Combobox,
  useCombobox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import LocaleToggle from "./LocaleToggle";
import { useLocale, useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/services/authService";
import { showError } from "@/services/errorHandler";
import { useRouter } from "@/lib/navigation";
import { UserContext, useUserContext } from "@/lib/userProvider";
import { modals } from "@mantine/modals";

type AppBarProps = {
  withSidebar?: boolean;
  withAuth?: boolean;
};

function AppBar({ withSidebar = true, withAuth = false }: AppBarProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const locale = useLocale();
  const tError = useTranslations("ErrorHandler");
  const tLogout = useTranslations("Logout");
  const tButton = useTranslations("Button");
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
    onSuccess: () => {
      modals.closeAll();
      router.push("/login");
    },
  });
  const initialName = (input: string): string => {
    const words = input.split(" ");
    let initials = "";
    for (let i = 0; i < words.length; i++) {
      if (i >= 2) {
        break;
      }
      initials += words[i][0];
    }
    return initials.toUpperCase();
  };
  const combobox = useCombobox();

  const { userData } = useUserContext();

  const showLogoutConfirmation = () => {
    combobox.toggleDropdown();
    modals.openConfirmModal({
      id: "logout-modal",
      closeOnConfirm: false,
      withCloseButton: false,
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: tLogout("logout_header"),
      centered: true,
      children: <p>{tLogout("logout_modal_body")}</p>,
      labels: {
        confirm: tButton("logout_confirm"),
        cancel: tButton("logout_cancel"),
      },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => mutation.mutate(),
    });
  };

  return (
    <React.Fragment>
      <div
        style={withSidebar ? { backdropFilter: "blur(20px)" } : {}}
        className={`drop-shadow rounded-lg px-2 py-2 h-14 ${
          withSidebar
            ? "bg-slate-300/60 dark:bg-slate-800/70 sticky z-10"
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
        </div>
        <div className="flex gap-2 items-center">
          {withAuth ? (
            <>
              <Combobox store={combobox} width={200} position="bottom-end">
                <Combobox.Target>
                  <Avatar
                    className="cursor-pointer"
                    src={userData?.avatar_url ? userData.avatar_url : null}
                    alt={`${userData?.display_name} avatar`}
                    color="stockwave"
                    onClick={() => combobox.toggleDropdown()}
                  >
                    {initialName(
                      userData?.display_name ? userData.display_name : "Avatar"
                    )}
                  </Avatar>
                </Combobox.Target>

                <Combobox.Dropdown>
                  <Combobox.Options>
                    <ThemeToggle variant="dropdown" />
                    <Combobox.Group
                      label={
                        <span className="flex gap-1 items-center">
                          <i className="ti ti-language" />
                          <p className="my-0">{t("dropdown_group")}</p>
                        </span>
                      }
                    >
                      <Combobox.Empty className="bg-transparent hover:bg-transparent m-2 mb-4 cursor-default">
                        <LocaleToggle
                          variant="dropdown"
                          locale={locale}
                          languageOptions={languageOptions}
                        />
                      </Combobox.Empty>
                    </Combobox.Group>
                  </Combobox.Options>
                  <Combobox.Footer>
                    <Button
                      size="xs"
                      color="red"
                      variant="transparent"
                      fullWidth
                      radius="md"
                      onClick={() => showLogoutConfirmation()}
                    >
                      <i className={`ti ti-logout text-lg me-2`} />
                      {tLogout("logout_btn")}
                    </Button>
                  </Combobox.Footer>
                </Combobox.Dropdown>
              </Combobox>
            </>
          ) : (
            <>
              <ThemeToggle />
              <LocaleToggle locale={locale} languageOptions={languageOptions} />
            </>
          )}
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
