"use client";

import { ActionIcon, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

function AppBar() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <React.Fragment>
      <div
        style={{ backdropFilter: "blur(20px)" }}
        className={`drop-shadow rounded-lg px-2 py-2 h-14 bg-slate-200/70 dark:bg-slate-800/70 sticky top-0 w-screen transition-width max-w-full flex justify-between items-center`}
      >
        <div className="ml-2">
          <ActionIcon
            variant="transparent"
            aria-label="Open sidebar"
            className="block md:hidden"
            onClick={() => open()}
          >
            <i className={`ti ti-menu-2 text-lg`} />
          </ActionIcon>
        </div>
        <div>
          <ThemeToggle />
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
