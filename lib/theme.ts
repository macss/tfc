import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: colors.teal[500]
    }
  }
});

export default theme;