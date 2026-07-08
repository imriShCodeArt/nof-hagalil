"use client";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { useShellEvent, useShellHeader } from "@/shell/hooks";
import { useAppShell } from "@/shell/hooks/use-app-shell";

type HomePageClientProps = {
  title: string;
  description: string;
};

export default function HomePageClient({
  title,
  description,
}: HomePageClientProps) {
  const t = useTranslations("HomePage");
  const { toggleDrawer, showSnackbar } = useAppShell();

  useShellHeader({ title });

  useShellEvent("drawer:toggled", ({ open }) => {
    if (open) {
      showSnackbar({
        message: t("drawerOpened"),
        severity: "info",
      });
    }
  });

  return (
    <Stack spacing={3} sx={{ maxWidth: 640 }}>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <Button
          variant="contained"
          startIcon={<MenuIcon />}
          onClick={toggleDrawer}
        >
          {t("toggleDrawer")}
        </Button>
        <Button
          variant="outlined"
          startIcon={<NotificationsActiveIcon />}
          onClick={() =>
            showSnackbar({
              message: t("demoSnackbar"),
              severity: "success",
            })
          }
        >
          {t("showSnackbar")}
        </Button>
      </Stack>
    </Stack>
  );
}
