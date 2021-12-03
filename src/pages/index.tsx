// ===================================================================
//                             Imports
// ===================================================================
import Head from 'next/head';
import Link from 'next/link';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import React from 'react';
import PageLayout from '../components/pageLayout';
import { Box, Typography } from '@mui/material';

// ===================================================================
//                            Component
// ===================================================================
const stateToProps = (state: RootState) => state;

const connector = connect(stateToProps, {});

/**
 * Home Page. Has links to login and sign up.
 *
 * @returns {Element} Page element
 */
function Home() {
    return (
        <PageLayout pageName='Expense Tracker'>
            <Head>
                <title>Expense Tracker</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Box>
                <Typography variant='h1'>Welcome!</Typography>
                <Link href='/login'>
                    <a>Login</a>
                </Link>
                <Link href='/sign_up'>
                    <a>Sign Up</a>
                </Link>
            </Box>
        </PageLayout>
    );
}

export default connector(Home);
