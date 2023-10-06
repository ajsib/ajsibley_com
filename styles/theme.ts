import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#002452', // Queen's Blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#fabd0f', // Queen's Gold
      contrastText: '#000',
    },
  },
});

export default theme;
