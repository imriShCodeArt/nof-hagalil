"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import {
  initialShellState,
  type SetHeaderOptions,
  type ShellEventListener,
  type ShellEventMap,
  type ShellState,
  type ShowSnackbarOptions,
} from "@/shell/types";

type ShellAction =
  | { type: "drawer/open" }
  | { type: "drawer/close" }
  | { type: "drawer/toggle" }
  | { type: "header/set"; payload: SetHeaderOptions }
  | { type: "header/reset" }
  | { type: "snackbar/show"; payload: ShowSnackbarOptions }
  | { type: "snackbar/hide" };

function shellReducer(state: ShellState, action: ShellAction): ShellState {
  switch (action.type) {
    case "drawer/open":
      return { ...state, drawerOpen: true };
    case "drawer/close":
      return { ...state, drawerOpen: false };
    case "drawer/toggle":
      return { ...state, drawerOpen: !state.drawerOpen };
    case "header/set":
      return { ...state, header: action.payload };
    case "header/reset":
      return { ...state, header: initialShellState.header };
    case "snackbar/show":
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity ?? "info",
        },
      };
    case "snackbar/hide":
      return {
        ...state,
        snackbar: { ...state.snackbar, open: false },
      };
    default:
      return state;
  }
}

export type AppShellContextValue = {
  state: ShellState;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setHeader: (header: SetHeaderOptions) => void;
  resetHeader: () => void;
  showSnackbar: (options: ShowSnackbarOptions) => void;
  hideSnackbar: () => void;
  on: <K extends keyof ShellEventMap>(
    event: K,
    listener: ShellEventListener<K>,
  ) => () => void;
  emit: <K extends keyof ShellEventMap>(
    event: K,
    payload: ShellEventMap[K],
  ) => void;
};

export const AppShellContext = createContext<AppShellContextValue | null>(null);

type AppShellProviderProps = {
  children: ReactNode;
};

export function AppShellProvider({ children }: AppShellProviderProps) {
  const [state, dispatch] = useReducer(shellReducer, initialShellState);
  const listenersRef = useRef(
    new Map<string, Set<(payload: unknown) => void>>(),
  );

  const emit = useCallback(
    <K extends keyof ShellEventMap>(event: K, payload: ShellEventMap[K]) => {
      listenersRef.current.get(event)?.forEach((listener) => {
        listener(payload);
      });
    },
    [],
  );

  const on = useCallback(
    <K extends keyof ShellEventMap>(
      event: K,
      listener: ShellEventListener<K>,
    ) => {
      const listeners =
        listenersRef.current.get(event) ??
        new Set<(payload: unknown) => void>();

      if (!listenersRef.current.has(event)) {
        listenersRef.current.set(event, listeners);
      }

      listeners.add(listener as (payload: unknown) => void);

      return () => {
        listeners.delete(listener as (payload: unknown) => void);
      };
    },
    [],
  );

  const openDrawer = useCallback(() => {
    dispatch({ type: "drawer/open" });
    emit("drawer:opened", undefined);
    emit("drawer:toggled", { open: true });
  }, [emit]);

  const closeDrawer = useCallback(() => {
    dispatch({ type: "drawer/close" });
    emit("drawer:closed", undefined);
    emit("drawer:toggled", { open: false });
  }, [emit]);

  const toggleDrawer = useCallback(() => {
    const nextOpen = !state.drawerOpen;
    dispatch({ type: nextOpen ? "drawer/open" : "drawer/close" });
    emit(nextOpen ? "drawer:opened" : "drawer:closed", undefined);
    emit("drawer:toggled", { open: nextOpen });
  }, [emit, state.drawerOpen]);

  const setHeader = useCallback(
    (header: SetHeaderOptions) => {
      dispatch({ type: "header/set", payload: header });
      emit("header:changed", header);
    },
    [emit],
  );

  const resetHeader = useCallback(() => {
    dispatch({ type: "header/reset" });
    emit("header:reset", undefined);
  }, [emit]);

  const showSnackbar = useCallback(
    (options: ShowSnackbarOptions) => {
      dispatch({ type: "snackbar/show", payload: options });
      emit("snackbar:shown", {
        message: options.message,
        severity: options.severity ?? "info",
      });
    },
    [emit],
  );

  const hideSnackbar = useCallback(() => {
    dispatch({ type: "snackbar/hide" });
    emit("snackbar:hidden", undefined);
  }, [emit]);

  const value = useMemo(
    () => ({
      state,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      setHeader,
      resetHeader,
      showSnackbar,
      hideSnackbar,
      on,
      emit,
    }),
    [
      state,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      setHeader,
      resetHeader,
      showSnackbar,
      hideSnackbar,
      on,
      emit,
    ],
  );

  return (
    <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>
  );
}
