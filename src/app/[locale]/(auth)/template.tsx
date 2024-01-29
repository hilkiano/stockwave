import pick from "lodash/pick";
import AppBar from "@/components/AppBar";
import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const messages = useMessages();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <main className="grow overflow-auto relative p-3">
        <NextIntlClientProvider
          messages={pick(messages, [
            "Button",
            "Menu",
            "Language",
            "Theme",
            "ErrorHandler",
            "Logout",
          ])}
        >
          <AppBar withSidebar={false} />
        </NextIntlClientProvider>
        {children}
      </main>
    </div>
  );
}
