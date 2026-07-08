"use client";

import { useEffect } from "react";
import { useAppShell } from "@/shell/hooks/use-app-shell";

export function useShellHeader({
  enabled = true,
  title,
  subtitle,
}: {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
}) {
  const { setHeader, resetHeader } = useAppShell();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setHeader({ title, subtitle });

    return () => {
      resetHeader();
    };
  }, [enabled, title, subtitle, setHeader, resetHeader]);
}
