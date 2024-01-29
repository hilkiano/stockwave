import { headers } from "next/headers";
import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";
import Sidebar from "@/components/Sidebar";
import AppBar from "@/components/AppBar";

export default function Template({ children }: { children: React.ReactNode }) {
  const messages = useMessages();
  const headersList = headers();
  let userData: UserProviderDataType | null = null;
  if (headersList.get("x-userdata")) {
    userData = JSON.parse(headersList.get("x-userdata")!);
  }

  return (
    <>
      <NextIntlClientProvider
        messages={pick(messages, [
          "Button",
          "Menu",
          "ErrorHandler",
          "Language",
          "Theme",
          "Logout",
        ])}
      >
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
          <div className="hidden md:flex p-3">
            <Sidebar />
          </div>
          <main className="grow overflow-auto relative pt-3 pb-14 pl-3 pr-3 md:pl-0">
            <AppBar withAuth />
            {children}
          </main>
        </div>
      </NextIntlClientProvider>
    </>
  );
}
