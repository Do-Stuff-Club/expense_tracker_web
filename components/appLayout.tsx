// ===================================================================
//                             Imports
// ===================================================================
import Head from 'next/head';
import React from 'react';
import styles from './pageLayout.module.css';
import AppHeader from './appHeader';
import { AppNavPage } from './app/nav/utils';
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
