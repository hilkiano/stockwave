import pick from "lodash/pick";
import Sidebar from "@/components/Sidebar";
import AppBar from "@/components/AppBar";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function Template({ children }: { children: React.ReactNode }) {
  const messages = useMessages();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <div className="hidden md:flex p-3">
        <NextIntlClientProvider messages={pick(messages, ["Button", "Menu"])}>
          <Sidebar />
        </NextIntlClientProvider>
      </div>
      <main className="grow overflow-auto relative pt-3 pb-14 pl-3 pr-3 md:pl-0">
        <NextIntlClientProvider messages={pick(messages, ["Button", "Menu"])}>
          <AppBar />
        </NextIntlClientProvider>
        <div className="">{children}</div>
      </main>
    </div>
  );
}
