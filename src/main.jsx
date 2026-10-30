import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from "./theme/theme";
import { Provider } from "react-redux";
import { store } from "./app/store";
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
    </Provider>
);