import { createTheme } from "@mui/material/styles";
import { purple } from '@mui/material/colors';
const theme = createTheme({
  typography: {
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
  },
  palette: {
    primary: {
    //   main: "#AA336A",
    //   contrastText: "#fff",
    main: purple[500],
    },
  },
});

export default theme;
