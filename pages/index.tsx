// ===================================================================
//                             Imports
// ===================================================================
import Head from 'next/head';
import Link from 'next/link';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import styles from '../styles/Home.module.css';
import React from 'react';
import PageLayout from '../components/pageLayout';

import Tags from '../components/tags';
import ExpenseForm from '../components/expenses/expenseForm';

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

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome!</h1>
                <Link href='/login'>
                    <a>Login</a>
                </Link>
                <Link href='/sign_up'>
                    <a>Sign Up</a>
                </Link>
            </main>

            <Tags />
        </PageLayout>
    );
}

export default connector(Home);
