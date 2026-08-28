import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "es"],
  defaultLocale: "fr",
  localePrefix: "always",
});