"use client";

import React from "react";
import { menus } from "@/vars/menus";
import { Avatar, Button, Divider, NavLink } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";

type SidebarProps = {
  withToggle?: boolean;
};

function Sidebar({ withToggle = true }: SidebarProps) {
  const t = useTranslations("Button");
  const tMenu = useTranslations("Menu");
  const pathname = usePathname();

  const [collapse, setCollapse] = useLocalStorage<boolean>({
    key: "sidebar-collapse",
    defaultValue: false,
  });

  const toggleCollapse = () => {
    setCollapse(collapse === true ? false : true);
  };

  const MainMenu = () => {
    return menus.map((menu, idx) => {
      if (menu.isUrl) {
        return (
          <NavLink
            key={idx}
            component={Link}
            href={menu.url}
            label={tMenu(menu.name)}
            active={pathname === menu.url}
            leftSection={
              <Avatar
                className={collapse ? "-ml-[.2rem]" : ""}
                variant="gradient"
                gradient={{ from: "cyan", to: "teal", deg: 145 }}
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

  const Stores = () => <></>;

  const StoreMenus = () => <div className="grow"></div>;

  const Collapser = () => (
    <Button
      size="xs"
      variant="subtle"
      leftSection={
        <i
          className={`ti text-lg ${
            collapse
              ? "ti-circle-chevrons-right ml-3"
              : "ti-circle-chevrons-left"
          }`}
        />
      }
      className="rounded-full"
      onClick={toggleCollapse}
    >
      {collapse ? "" : t("collapse")}
    </Button>
  );

  return (
    <div
      style={{ backdropFilter: "blur(20px)" }}
      className={`shadow rounded-lg px-2 py-2 h-full bg-slate-200/70 dark:bg-slate-800/70 transition-width ${
        collapse && withToggle ? "w-[60px]" : "w-[260px]"
      }`}
    >
      <div className="flex flex-col gap-2 h-full">
        <MainMenu />
        <Divider />
        <Stores />
        <Divider />
        <StoreMenus />
        {withToggle && <Collapser />}
      </div>
    </div>
  );
}

export default Sidebar;
