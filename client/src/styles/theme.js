import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontFamily: "'Rubik', sans-serif"
    },
    palette: {
        primary: {
            main: "#03c9d7",
            light: "#65fcff",
            dark: "#0098a6"
        },
        secondary: {
            main: "#fb9678",
            light: "#ffc7a7",
            dark: "#c5674c"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: "#fff"
                }
            }
        }
    }
})