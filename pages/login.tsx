import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Button } from "@material-ui/core";

import { login, LoginParams } from "../redux/user/action";
import TestComponent from "../components/test";
import { Router } from "@material-ui/icons";
import withAuthentication from "../components/withAuthentication";

const connector = connect(null, {
  login,
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
    <>
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
    </>
  );
}

export default connector(Login);
