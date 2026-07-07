"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import styles from "./locale-switcher.module.css";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className={styles.switcher}>
      {routing.locales.map((cur) => (
        <button
          key={cur}
          type="button"
          className={styles.button}
          aria-current={cur === locale ? "true" : undefined}
          disabled={cur === locale}
          onClick={() => router.replace(pathname, { locale: cur as Locale })}
        >
          {t("locale", { locale: cur })}
        </button>
      ))}
    </nav>
  );
}
