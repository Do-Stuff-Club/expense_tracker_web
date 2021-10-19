// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import TabNav from './nav/tabNav';
import { AppNavPage } from './nav/utils';

// ===================================================================
//                            Component
// ===================================================================
type AppHeaderProps = {
    page: AppNavPage;
};

/**
 * App Bar for expense tracker app. Contains navigation links to
 * dashboard, expenses, and tags.
 *
 * @param {AppHeaderProps} props - Props containing the page being used
 *
 * @returns {Element} AppBar element
 */
export default function AppHeader(props: AppHeaderProps): JSX.Element {
    return (
        <>
            <AppBar
                position='fixed'
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <Typography variant='h6'>Expense Tracker</Typography>
                    <TabNav page={props.page} />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}
