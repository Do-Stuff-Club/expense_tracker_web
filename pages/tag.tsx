import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { RootState } from "../redux/store";
import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import styles from "../styles/Home.module.css";
import withAuth, { AuthProps } from "../components/withAuthentication";
import { useEffect } from 'react';
import { fetchTags } from '../redux/tags/action';
import CategoryCreator from '../components/categoryCreator';

const stateToProps = (state: RootState) => ({
  auth: {
    loggedIn: state.user.loggedIn,
  },
  ...state,
});

const dispatchToProps = {
  fetchTags
}

const connector = connect(stateToProps, dispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type TagProps = ReduxProps;

function Tag(props: TagProps) {
  useEffect(()=>{
    props.fetchTags({
      user_id: props.user.id,
      headers: props.user.authHeaders
    })
  }, []) // Pass an empty array so it only fires once

  return (
    <div className={styles.container}>
      <Head>
        <title>Tag Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tags!</h1>
        <CategoryCreator></CategoryCreator>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export default connector(withAuth(Tag));
