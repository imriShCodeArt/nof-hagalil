"use client";

import type { ReactNode } from "react";
import { AppShellProvider } from "@/shell/app-shell-provider";
import AppShell from "@/shell/components/app-shell";

type AppShellLayoutProps = {
  children: ReactNode;
};

export default function AppShellLayout({ children }: AppShellLayoutProps) {
  return (
    <AppShellProvider>
      <AppShell>{children}</AppShell>
    </AppShellProvider>
  );
}
