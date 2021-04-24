// ===================================================================
//                             Imports
// ===================================================================
import Link from 'next/link';
import { RootState } from '../../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import styles from '../../styles/Home.module.css';
import withAuth from '../../components/withAuthentication';
import React, { useEffect } from 'react';
import { updateAllCategoriesAction } from '../../redux/tags/action';
import { Button } from '@material-ui/core';
import PageLayout from '../../components/pageLayout';
import NavBreadcrumbs from '../../components/navBreadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import { deleteCategoryCall, getTagsCall } from '../../api/tag/call';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// ===================================================================
//                            Component
// ===================================================================
const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});

const dispatchToProps = {
    updateAllCategoriesAction,
};

const connector = connect(stateToProps, dispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type TagProps = ReduxProps;

/**
 * Category Index Page. Displays all categories and their tags. Has links to create and edit categories.
 *
 * @param {TagProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function Tag(props: TagProps) {
    useEffect(() => {
        getTagsCall({
            user_id: props.user.id,
            headers: props.user.authHeaders,
        }).then(
            (data) => props.updateAllCategoriesAction(data),
            (error) => console.log(error),
        );
    }, []); // Pass an empty array so it only fires once

    const onDelete = (id: number) => {
        deleteCategoryCall({
            id: id,
            headers: props.user.authHeaders,
        }).then(
            (data) => props.updateAllCategoriesAction(data),
            (error) => console.log(error),
        );
    };

    return (
        <PageLayout pageName='My Tags'>
            <NavBreadcrumbs></NavBreadcrumbs>
            <main>
                <h1 className={styles.title}>Tags!</h1>
                <Link href='/category/new' passHref>
                    <Button variant='contained'>New Category</Button>
                </Link>
                <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell align='right'>Required?</TableCell>
                                <TableCell align='left'>Tags</TableCell>
                                <TableCell align='right'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.tag.categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell component='th' scope='row'>
                                        {category.name}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {JSON.stringify(category.required)}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {JSON.stringify(category.tags)}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Link
                                            href={
                                                '/category/' +
                                                category.id +
                                                '/edit'
                                            }
                                            passHref
                                        >
                                            <IconButton aria-label='Edit'>
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            aria-label='Delete'
                                            onClick={() =>
                                                onDelete(category.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
        </PageLayout>
    );
}

export default connector(withAuth(Tag));
