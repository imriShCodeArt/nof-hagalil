"use client";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import type { ReactNode } from "react";

type AppMainProps = {
  children: ReactNode;
};

export default function AppMain({ children }: AppMainProps) {
  return (
    <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
      <Toolbar />
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>{children}</Box>
    </Box>
  );
}
