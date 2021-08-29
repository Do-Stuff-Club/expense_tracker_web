// ===================================================================
//                             Imports
// ===================================================================
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import styles from './pageLayout.module.css';
// ===================================================================
//                            Component
// ===================================================================

export interface PageLayoutProps {
    pageName: string;
    children: React.ReactNode;
    center?: boolean;
}

/**
 * Higher-order component for basic page layouts
 *
 * @param {PageLayoutProps} props - Props containing children nodes and the name of the page being rendered
 * @returns {Element} page layout
 */
export default function PageLayout(props: PageLayoutProps): JSX.Element {
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
            <div className={styles.outerContainer}>
                <div></div>
                <div
                    className={props.center ? styles.center : styles.mainColumn}
                >
                    {props.children}
                </div>
                <div></div>
            </div>
            <footer></footer>
        </>
    );
}
