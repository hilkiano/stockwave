import { Card, Center } from "@mantine/core";
import {
  NextIntlClientProvider,
  useTranslations,
  useMessages,
} from "next-intl";
import RegisterSection from "./components/RegisterSection";
import pick from "lodash/pick";
import LoginForm from "./components/LoginForm";

export default function Page() {
  const t = useTranslations("Page.Login");
  const messages = useMessages();

  return (
    <Center className="mt-4 mb-12">
      <Card withBorder radius="lg" className="w-full max-w-[750px]">
        <div className="flex flex-col md:flex-row gap-5 md:gap-2 p-0 md:p-3">
          <div className="flex flex-col px-3">
            <h1 className="m-0 font-normal text-3xl md:text-4xl">
              {t("title")}
            </h1>
            <p className="m-0 opacity-75">{t("body_1")}</p>
            <NextIntlClientProvider messages={pick(messages, ["Page.Login"])}>
              <LoginForm />
            </NextIntlClientProvider>
          </div>
          <NextIntlClientProvider messages={pick(messages, ["Page.Login"])}>
            <RegisterSection />
          </NextIntlClientProvider>
        </div>
      </Card>
    </Center>
  );
}
