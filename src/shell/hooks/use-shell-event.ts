"use client";

import { useEffect, useRef } from "react";
import { useAppShell } from "@/shell/hooks/use-app-shell";
import type { ShellEventMap } from "@/shell/types";

export function useShellEvent<K extends keyof ShellEventMap>(
  event: K,
  listener: (payload: ShellEventMap[K]) => void,
) {
  const { on } = useAppShell();
  const listenerRef = useRef(listener);
  listenerRef.current = listener;

  useEffect(() => {
    return on(event, (payload) => {
      listenerRef.current(payload);
    });
  }, [event, on]);
}
