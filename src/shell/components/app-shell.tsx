"use client";

import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import AppDrawer from "@/shell/components/app-drawer";
import AppHeader from "@/shell/components/app-header";
import AppMain from "@/shell/components/app-main";
import AppSnackbar from "@/shell/components/app-snackbar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppHeader />
      <AppDrawer />
      <AppMain>{children}</AppMain>
      <AppSnackbar />
    </Box>
  );
}
