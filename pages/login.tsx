import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Button, makeStyles } from "@material-ui/core";

import { loginAction } from "../redux/user/action";
import TestComponent from "../components/test";
import { Router } from "@material-ui/icons";
import withAuthentication from "../components/withAuthentication";
import PageLayout from "../components/pageLayout";
<<<<<<< HEAD
import styles from '../styles/Login.module.css';

const buttonStyling = makeStyles({
  outlinedPrimary: {
    color: 'white',
    border: '1px solid white'
  }
}, { name: 'MuiButton' });

const textFieldStyling = makeStyles({
  cssLabel: {
    color: 'white'
  }
}, { name: 'MuiInputBase' });

// const outlinedInputStyling = makeStyles({
//   cssLabel: {
//     color: 'white'
//   }
// }, { name: 'OutlinedInput' });
=======
import { LoginParams } from "../api/user/types";
import { loginCall } from "../api/user/call";
>>>>>>> 209b11695e10fbe2048b3bbdbf3856459a16e7f1

const connector = connect(null, {
  loginAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type LoginProps = ReduxProps;

function Login(props: LoginProps) {
  const buttonStyles = buttonStyling();
  const textFieldStyles = textFieldStyling();

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
    loginCall(state).then(
      (data) => {
        props.loginAction(data)
        router.push("/dashboard")
      },
      (error) => {
        console.log(error)
      })
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
              variant="outlined"
              onChange={(e) => handleChange("email", e)}
              InputLabelProps={{
                classes: {
                  root: textFieldStyles.cssLabel
                }
              }}
            />
            <br />
            <TextField
              label="Password"
              variant="outlined"
              onChange={(e) => handleChange("password", e)}
            />
            <br />
            <div className={styles.loginButtonContainer}>
              <Button className={buttonStyles.outlinedPrimary} color="primary" variant="outlined" href="/">
                Home
              </Button>
            </div>
            <div className={styles.loginButtonContainer}>
              <Button className={buttonStyles.outlinedPrimary} color="primary" variant="outlined" type="submit">
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
