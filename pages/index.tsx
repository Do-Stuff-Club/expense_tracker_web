import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RootState } from '../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import styles from '../styles/Home.module.css';
import React from 'react';
import PageLayout from '../components/pageLayout';

const stateToProps = (state: RootState) => state;

const connector = connect(stateToProps, {});
type ReduxProps = ConnectedProps<typeof connector>;
type HomeProps = ReduxProps;

function Home(props: HomeProps) {
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
        </PageLayout>
    );
}

export default connector(Home);
