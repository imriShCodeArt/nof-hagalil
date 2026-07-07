"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { getLocaleDirection } from "@/i18n/locale";
import type { Locale } from "@/i18n/routing";
import { createAppTheme } from "@/theme/theme";

type AppProvidersProps = {
  children: ReactNode;
  locale: Locale;
};

export default function AppProviders({ children, locale }: AppProvidersProps) {
  const direction = getLocaleDirection(locale);
  const theme = createAppTheme(direction);

  return (
    <AppRouterCacheProvider
      key={locale}
      options={
        direction === "rtl"
          ? { key: "muirtl", stylisPlugins: [prefixer, rtlPlugin] }
          : undefined
      }
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
