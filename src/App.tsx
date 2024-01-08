import { createTheme, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import DebtReductionCalculator from './components/debtReductionCalculator';

const theme = createTheme();

function App() {
  return (
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
        <DebtReductionCalculator />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
