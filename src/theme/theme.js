import { createTheme } from '@mui/material/styles';

export const colors = {
  base: '#121110', // 60%
  surface: '#26231F', // 30%
  surfaceHover: '#2F2B26',
  accent: '#FF6B3D', // 10%
  text: '#F2EDE6',
  textMuted: '#A39B90',
  line: 'rgba(242, 237, 230, 0.1)',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.accent, contrastText: colors.base },
    background: { default: colors.base, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.textMuted },
    divider: colors.line,
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    h1: { fontFamily: '"Fraunces", serif', fontWeight: 700 },
    h2: { fontFamily: '"Fraunces", serif', fontWeight: 700 },
    h3: { fontFamily: '"Fraunces", serif', fontWeight: 700 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 999,
          padding: '10px 26px',
        },
      },
    },
  },
});

export default theme;