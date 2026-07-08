"use client";

import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import NavigationLink from "@/components/navigation-link";
import { useAppShell } from "@/shell/hooks/use-app-shell";
import { drawerWidth } from "@/shell/components/app-header";

export default function AppDrawer() {
  const t = useTranslations("AppShell");
  const pathname = usePathname();
  const { state, closeDrawer } = useAppShell();

  const navItems = [{ href: "/", label: t("navHome"), icon: <HomeIcon /> }];

  const drawerContent = (
    <Box sx={{ width: drawerWidth, height: "100%" }} role="presentation">
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="h6" color="text.primary">
          {t("defaultTitle")}
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.href}
            component={NavigationLink}
            href={item.href}
            selected={pathname === item.href}
            onClick={closeDrawer}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={state.drawerOpen}
      onClose={closeDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
