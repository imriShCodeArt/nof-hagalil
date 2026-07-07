"use client";

import { createTheme, type Direction } from "@mui/material/styles";

export function createAppTheme(direction: Direction) {
  return createTheme({
    direction,
    cssVariables: true,
    typography: {
      fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    },
    palette: {
      primary: {
        main: "#2e6f40",
        light: "#4f9a63",
        dark: "#1f4d2c",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#4a7c9b",
        light: "#6f9db8",
        dark: "#32566b",
        contrastText: "#ffffff",
      },
      background: {
        default: "#fafaf8",
        paper: "#ffffff",
      },
      text: {
        primary: "#1a2e1f",
        secondary: "#5a6b5e",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "var(--mui-palette-background-default)",
          },
        },
      },
    },
  });
}
