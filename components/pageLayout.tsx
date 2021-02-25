import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';

export interface PageLayoutProps {
    pageName: string;
    children: React.ReactNode;
}

export default function PageLayout(props: PageLayoutProps) {
    return (
        <>
            <Head>
                <title>{props.pageName}</title>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>Expense Tracker</Typography>
                </Toolbar>
            </AppBar>
            <Box>{props.children}</Box>
            <footer></footer>
        </>
    );
}
