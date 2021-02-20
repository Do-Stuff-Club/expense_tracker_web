import { Button, Card, Grid, List, Switch, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../redux/store";
import withAuth from "../../components/withAuthentication";
import PageLayout from "../../components/pageLayout";

const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});
const connector = connect(stateToProps, {
});
type ReduxProps = ConnectedProps<typeof connector>;
type ExpensesProps = ReduxProps;

function Expenses(props: ExpensesProps) {
    const router = useRouter();

    return (
        <PageLayout pageName="Expenses">
            Here be dragons
        </PageLayout>
    );
}

export default connector(withAuth(Expenses));
