import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Button } from "@material-ui/core";

import { loginAction } from "../redux/user/action";
import TestComponent from "../components/test";
import { Router } from "@material-ui/icons";
import withAuthentication from "../components/withAuthentication";
import PageLayout from "../components/pageLayout";
import { LoginParams } from "../api/user/types";
import { loginCall } from "../api/user/call";

const connector = connect(null, {
  loginAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type LoginProps = ReduxProps;

function Login(props: LoginProps) {
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
      <h1>Log in</h1>
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
        <Button variant="contained" type="submit">
          Log In
        </Button>
      </form>
      <TestComponent></TestComponent>
      <Link href="/">
        <a>Home</a>
      </Link>
    </PageLayout>
  );
}

export default connector(Login);
