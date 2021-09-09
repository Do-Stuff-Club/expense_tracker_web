// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import Link from 'next/link';
import {
    AppBar,
    Button,
    ButtonGroup,
    Toolbar,
    Typography,
} from '@material-ui/core';

// ===================================================================
//                            Component
// ===================================================================
export enum NavPage {
    DASHBOARD = 'dashboard_page',
    EXPENSES = 'expenses_page',
    TAGS = 'tags_page',
}

type AppHeaderProps = {
    page: NavPage;
};

/**
 * App Bar for expense tracker app. Contains navigation links to
 * dashboard, expenses, and tags.
 *
 * @param {AppHeaderProps} props - Props containing the page being used
 *
 * @returns {Element} AppBar element
 */
export default function AppHeader(props: AppHeaderProps): JSX.Element {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6'>Expense Tracker</Typography>
                <ButtonGroup
                    size='large'
                    color='primary'
                    aria-label='large outlined primary button group'
                >
                    <Link href='/dashboard' passHref>
                        <Button disabled={props.page == NavPage.DASHBOARD}>
                            Dashboard
                        </Button>
                    </Link>
                    <Link href='/tags' passHref>
                        <Button disabled={props.page == NavPage.TAGS}>
                            Tags
                        </Button>
                    </Link>
                    <Link href='/expenses' passHref>
                        <Button>Expenses</Button>
                    </Link>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    );
}
