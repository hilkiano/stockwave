"use client";

import React from "react";
import { menus } from "@/vars/menus";
import { Avatar, Button, NavLink } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserType, updateUser } from "@/services/userService";
import { showError } from "@/services/errorHandler";
import { useUserContext } from "@/lib/userProvider";
import { useSidebarContext } from "@/lib/sidebarProvider";

type SidebarProps = {
  withToggle?: boolean;
};

function Sidebar({ withToggle = true }: SidebarProps) {
  const tError = useTranslations("ErrorHandler");
  const tMenu = useTranslations("Menu");
  const t = useTranslations("Button");
  const pathname = usePathname();

  const { userData } = useUserContext();
  const { collapsed, setCollapsed } = useSidebarContext();

  const MainMenu = () => {
    return menus.map((menu, idx) => {
      if (menu.isUrl) {
        return (
          <NavLink
            key={idx}
            component={Link}
            href={menu.url}
            passHref
            label={tMenu(menu.name)}
            active={pathname === menu.url}
            leftSection={
              <Avatar
                className={collapsed ? "-ml-[.2rem]" : ""}
                variant="gradient"
                gradient={{ from: "stockwave", to: "tomato", deg: 45 }}
                radius="xl"
                size="sm"
              >
                <i className={`ti ti-${menu.icon} text-lg`} />
              </Avatar>
            }
          />
        );
      } else {
        return <></>;
      }
    });
  };

  const mutation = useMutation({
    mutationFn: () => {
      const payload: UpdateUserType = {
        id: userData ? userData.id : "",
        configs: {
          ui: {
            sidebar_collapsed: collapsed,
          },
        },
      };
      return updateUser(payload);
    },
    onError: (error) => {
      showError(tError("modal_title"), error);
    },
  });

  const StoreMenus = () => <div className="grow"></div>;

  const Collapser = () => (
    <Button
      size="xs"
      variant="subtle"
      leftSection={
        <i
          className={`ti text-lg ${
            collapsed
              ? "ti-circle-chevrons-right ml-3"
              : "ti-circle-chevrons-left"
          }`}
        />
      }
      className="rounded-full"
      onClick={() => {
        setCollapsed(!collapsed);
        mutation.mutate();
      }}
    >
      {collapsed ? "" : t("collapse")}
    </Button>
  );

  return (
    <div
      style={{ backdropFilter: "blur(20px)" }}
      className={`shadow rounded-lg px-2 py-2 h-full bg-slate-300/60 dark:bg-slate-800/70 transition-width ${
        collapsed && withToggle ? "w-[60px]" : "w-[260px]"
      }`}
    >
      <div className="flex flex-col gap-2 h-full">
        <MainMenu />
        <StoreMenus />
        {withToggle && <Collapser />}
      </div>
    </div>
  );
}

export default Sidebar;
