"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={locale}
      aria-label={t("label")}
      onChange={(_, value) => {
        if (value) {
          router.replace(pathname, { locale: value });
        }
      }}
    >
      {routing.locales.map((cur) => (
        <ToggleButton key={cur} value={cur} aria-label={t("locale", { locale: cur })}>
          {t("locale", { locale: cur })}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
