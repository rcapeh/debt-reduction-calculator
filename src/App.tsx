import { createTheme, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import SnowballCalculator from './components/snowballCalculator';

const theme = createTheme();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <h1>content</h1>
          <SnowballCalculator />
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
