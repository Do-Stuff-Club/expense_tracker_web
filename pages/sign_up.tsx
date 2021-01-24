import Head from "next/head";
import { useRouter } from "next/router";

import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Button } from "@material-ui/core";

import { signUp, SignUpParams } from "../redux/user/action";
import TestComponent from "../components/test";
import PageLayout from "../components/pageLayout";

const connector = connect(null, {
  signUp,
});
type ReduxProps = ConnectedProps<typeof connector>;
type SignUpProps = ReduxProps;

export function SignUp(props: SignUpProps) {
  const [state, setState] = useState<SignUpParams>({
    email: "",
    password: "",
    password_confirmation: "",
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
    props.signUp(state).then(
      (success) => {
        console.log(success);
        router.push("/");
      },
      (error) => {
        console.log(error);
      }
    );
    event.preventDefault();
  };

  return (
    <PageLayout pageName="Sign Up">
      <h1>Sign Up</h1>
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
        <TextField
          label="Password Confirmation"
          variant="filled"
          onChange={(e) => handleChange("password_confirmation", e)}
        />
        <br />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
      <TestComponent></TestComponent>
    </PageLayout>
  );
}

export default connector(SignUp);
