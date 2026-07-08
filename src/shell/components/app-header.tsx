"use client";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/locale-switcher";
import { useAppShell } from "@/shell/hooks/use-app-shell";

const drawerWidth = 280;

export default function AppHeader() {
  const t = useTranslations("AppShell");
  const { state, toggleDrawer } = useAppShell();
  const { title, subtitle, actions } = state.header;

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: "100%",
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label={t("openMenu")}
          onClick={toggleDrawer}
          sx={{ mr: 0.5 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" noWrap component="div" color="text.primary">
            {title ?? t("defaultTitle")}
          </Typography>
          {subtitle ? (
            <Typography variant="body2" noWrap color="text.secondary">
              {subtitle}
            </Typography>
          ) : null}
        </Box>

        {actions}
        <LocaleSwitcher />
      </Toolbar>
    </AppBar>
  );
}

export { drawerWidth };
