import type { AlertColor } from "@mui/material/Alert";
import type { ReactNode } from "react";

export type ShellHeaderState = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
};

export type ShellSnackbarState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

export type ShellState = {
  drawerOpen: boolean;
  header: ShellHeaderState;
  snackbar: ShellSnackbarState;
};

export type ShellEventMap = {
  "drawer:opened": undefined;
  "drawer:closed": undefined;
  "drawer:toggled": { open: boolean };
  "header:changed": ShellHeaderState;
  "header:reset": undefined;
  "snackbar:shown": { message: string; severity: AlertColor };
  "snackbar:hidden": undefined;
};

export type ShellEventListener<K extends keyof ShellEventMap> = (
  payload: ShellEventMap[K],
) => void;

export type SetHeaderOptions = ShellHeaderState;

export type ShowSnackbarOptions = {
  message: string;
  severity?: AlertColor;
};

export const initialShellState: ShellState = {
  drawerOpen: false,
  header: {},
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
};
