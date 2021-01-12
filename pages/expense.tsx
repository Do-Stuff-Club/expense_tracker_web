import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { RootState } from "../redux/store";
import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import styles from "../styles/Home.module.css";
import withAuth, { AuthProps } from "../components/withAuthentication";

const stateToProps = (state: RootState): AuthProps => ({
  auth: {
    loggedIn: state.user.loggedIn,
  },
  ...state,
});

const connector = connect(stateToProps, {});
type ReduxProps = ConnectedProps<typeof connector>;
type ExpenseProps = ReduxProps;

function Expense(props: ExpenseProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Expense Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome!</h1>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/sign_up">
          <a>Sign Up</a>
        </Link>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export default connector(withAuth(Expense));
