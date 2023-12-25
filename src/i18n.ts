import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: {
    ...(await import(`../messages/${locale}/common.json`)).default,
    ...(await import(`../messages/${locale}/meta.json`)).default,
    ...(await import(`../messages/${locale}/page.json`)).default,
  },
}));
