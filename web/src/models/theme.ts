import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

export const theme = responsiveFontSizes(createMuiTheme({
    palette: {
        secondary: deepPurple,
        background: {
            default: "#f4f6f8",
        }
    },
    spacing: 8,
}));
