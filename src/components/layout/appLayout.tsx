// ===================================================================
//                             Imports
// ===================================================================
import { Box } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import AppHeader from './appHeader';
import { AppNavPage } from '../nav/utils';
// ===================================================================
//                            Component
// ===================================================================

export interface AppLayoutProps {
    page: AppNavPage;
    children: React.ReactNode;
    center?: boolean;
}

/**
 * Higher-order component for basic app layouts
 *
 * @param {AppLayoutProps} props - Props containing children nodes and the name of the app being rendered
 * @returns {Element} app layout
 */
export default function AppLayout(props: AppLayoutProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Expense Tracker App</title>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>
            <AppHeader page={props.page}></AppHeader>
            <Box sx={{ display: 'flex' }}>{props.children}</Box>
            <footer></footer>
        </>
    );
}
