// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, green } from '@mui/material/colors';
// ===================================================================
//                              Theme
// ===================================================================
const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

// ===================================================================
//                            Component
// ===================================================================
type AppThemeProviderProps = {
    children: React.ReactNode;
};

/**
 * Top-level theme provider for use within the App.
 *
 * @param {AppThemeProviderProps} props - props with children for ThemeProvider
 * @returns {Element} Component with ThemeProvider context
 */
export default function AppThemeProvider(
    props: AppThemeProviderProps,
): JSX.Element {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
