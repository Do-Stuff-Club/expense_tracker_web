import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { RootState } from "../redux/store";
import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import styles from "../styles/Home.module.css";
import withAuth, { AuthProps } from "../components/withAuthentication";
import React, { useEffect } from "react";
import { fetchTags, deleteCategory } from "../redux/tags/action";
import CategoryCreator from "../components/categoryCreator";
import { Button } from "@material-ui/core";
import CategoryView from "../components/categoryView";
import TestComponent from "../components/test";

const stateToProps = (state: RootState) => ({
  auth: {
    loggedIn: state.user.loggedIn,
  },
  ...state,
});

const dispatchToProps = {
  fetchTags,
  deleteCategory,
};

const connector = connect(stateToProps, dispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type TagProps = ReduxProps;

function Tag(props: TagProps) {
  useEffect(() => {
    props.fetchTags({
      user_id: props.user.id,
      headers: props.user.authHeaders,
    });
  }, []); // Pass an empty array so it only fires once

  const onDelete = (id: number) => {
    props.deleteCategory({
      id: id,
      headers: props.user.authHeaders,
    });
  };

  return (
    <>
      <Head>
        <title>Tag Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Tags!</h1>
        <Link href="/category/new" passHref>
          <Button variant="contained">New Category</Button>
        </Link>
        {props.tag.categories.map((category, i) => {
          return (
            <CategoryView
              listKey={i}
              category={category}
              onDelete={() => onDelete(category.id)}
            ></CategoryView>
          );
        })}
        <p>{JSON.stringify(props.tag)}</p>
        <TestComponent></TestComponent>
      </main>

      <footer className={styles.footer}></footer>
    </>
  );
}

export default connector(withAuth(Tag));
