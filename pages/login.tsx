import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Button, makeStyles } from "@material-ui/core";

import { login, LoginParams } from "../redux/user/action";
import TestComponent from "../components/test";
import { Router } from "@material-ui/icons";
import withAuthentication from "../components/withAuthentication";
import PageLayout from "../components/pageLayout";
import styles from '../styles/Login.module.css';

const useStyles = makeStyles({
  outlinedPrimary: {
    backgroundColor: "white",
  }
}, { name: 'MuiButton' });

const connector = connect(null, {
  login,
});
type ReduxProps = ConnectedProps<typeof connector>;
type LoginProps = ReduxProps;

function Login(props: LoginProps) {
  const customStyles = useStyles();

  const [state, setState] = useState<LoginParams>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (
    name: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    setState({
      ...state,
      [name]: target.value,
    });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    props.login(state).then(
      (success) => {
        console.log(success);
        router.push("/tag"); // FIXME
      },
      (error) => {
        console.log(error);
      }
    );
    event.preventDefault();
  };

  return (
    <PageLayout pageName="Expense Tracker Login">
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className={styles.outerContainer}>
        <div className={styles.loginText}>
          <h1>Log in</h1>
        </div>
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="filled"
              onChange={(e) => handleChange("email", e)}
            />
            <br />
            <TextField
              label="Password"
              variant="filled"
              onChange={(e) => handleChange("password", e)}
            />
            <br />
            <div className={styles.loginButtonContainer}>
              <Button className={customStyles.outlinedPrimary} color="primary" variant="outlined" href="/">
                Home
              </Button>
            </div>
            <div className={styles.loginButtonContainer}>
              <Button className={customStyles.outlinedPrimary} color="primary" variant="outlined" type="submit">
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>
      <TestComponent></TestComponent>
    </PageLayout>
  );
}

export default connector(Login);
