"use client";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppShell } from "@/shell/hooks/use-app-shell";

export default function AppSnackbar() {
  const { state, hideSnackbar } = useAppShell();
  const { open, message, severity } = state.snackbar;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={hideSnackbar}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
