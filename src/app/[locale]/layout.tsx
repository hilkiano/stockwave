import "@/styles/globals.css";
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.css";
import "@/styles/layout.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/styles/theme";
import { ModalsProvider } from "@mantine/modals";

import { workSans } from "@/styles/fonts";
import { notFound } from "next/navigation";
import QueryProvider from "@/lib/queryProvider";
import { Notifications } from "@mantine/notifications";
import { headers } from "next/headers";
import SidebarProvider from "@/lib/sidebarProvider";
import UserProvider from "@/lib/userProvider";

const locales = ["en", "id"];

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  const { userData, userUiConfigs } = getInitialValue();

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        ></link>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <body className={`${workSans.variable} font-sans antialiased`}>
        <UserProvider value={userData}>
          <SidebarProvider
            value={userUiConfigs ? userUiConfigs.sidebar_collapsed : false}
          >
            <QueryProvider>
              <MantineProvider theme={theme}>
                <Notifications />
                <ModalsProvider>{children}</ModalsProvider>
              </MantineProvider>
            </QueryProvider>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}

function getInitialValue() {
  const headersList = headers();
  let userData: UserProviderDataType | null = null;
  let userUiConfigs: UserConfigModelType["ui"] | null = null;

  if (headersList.has("x-userdata")) {
    const parsedUserData: UserProviderDataType = JSON.parse(
      headersList.get("x-userdata")!
    );
    userData = parsedUserData;

    if (parsedUserData.configs) {
      userUiConfigs = parsedUserData.configs.ui;
    }
  }

  return { userData, userUiConfigs };
}
