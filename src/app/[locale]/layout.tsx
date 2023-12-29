import "@/styles/globals.css";
import "@mantine/core/styles.layer.css";
import "@/styles/layout.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/styles/theme";

import { workSans } from "@/styles/fonts";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import QueryProvider from "@/lib/queryProvider";

const locales = ["en", "id"];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Meta.Dashboard" });

  return {
    title: t("title", { app_name: process.env.APP_NAME }),
    description: t("desc"),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

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
        <QueryProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
