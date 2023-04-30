import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16ABF8",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: "white",
          textTransform: "none",
          borderRadius: "45px",
          width: "auto",
          height: "fit-content",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
        },
      },
    },
  },
  typography: {
    h2: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "0px",
      paddingBottom: "0px",
    },
  },
});

export default theme;
