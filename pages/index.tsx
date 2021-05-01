import Head from 'next/head';
import Link from 'next/link';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import styles from '../styles/Home.module.css';
import React from 'react';
import PageLayout from '../components/pageLayout';
import TagChip from '../components/tagChip';

const stateToProps = (state: RootState) => state;

const connector = connect(stateToProps, {});

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
                <TagChip label='da' />
                <TagChip label='fuck' />
                <TagChip label='da' />
                <TagChip label='police' />
                <TagChip label='kenneth' />
                <TagChip label='varun' />
                <TagChip label='mena' />
                <TagChip label='wtf' />
                <TagChip label='The quick brown fox is quick and brown' />
                <TagChip label='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' />
                <TagChip label='aaaaaaaaaaaaaaa' />
                <TagChip label='a' />
                <TagChip label='b' />
                <TagChip label='bbbbbbbbbbbbb' />
                <TagChip label='product' />
                <TagChip label='purchase' />
            </main>
        </PageLayout>
    );
}

export default connector(Home);
