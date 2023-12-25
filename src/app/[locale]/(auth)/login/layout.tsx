import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Meta.Login" });

  return {
    title: t("title", { app_name: process.env.APP_NAME }),
    description: t("desc"),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
