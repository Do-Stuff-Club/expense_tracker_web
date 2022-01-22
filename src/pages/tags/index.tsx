// ===================================================================
//                             Imports
// ===================================================================
import { RootState } from '../../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import withAuth from '../../components/misc/withAuthentication';
import React, { useEffect, useState } from 'react';
import {
    getAllTagsAction,
    createTagAction,
    updateTagAction,
    deleteTagAction,
} from '../../redux/tags/action';
import TagTreeView from '../../components/tags/tagTreeView';
import { Tag } from '../../redux/tags/types';
import Debug from '../../components/misc/debug';
import AppLayout from '../../components/layout/appLayout';
import { AppNavPage } from '../../components/nav/utils';
import { Box } from '@mui/material';
import TagActionDrawer from '../../components/tags/tagActionDrawer';

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
    getAllTagsAction,
    createTagAction,
    updateTagAction,
    deleteTagAction,
};

const connector = connect(stateToProps, dispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export type TagProps = ReduxProps;

/**
 * Tag Index Page. Displays all categories and their tags. Has links to create and edit categories.
 *
 * @param {TagProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function TagIndex(props: TagProps) {
    useEffect(() => {
        props.getAllTagsAction();
    }, []); // Pass an empty array so it only fires once

    const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);

    return (
        <AppLayout page={AppNavPage.TAGS}>
            <TagActionDrawer
                selectedTag={selectedTag}
                {...props}
            ></TagActionDrawer>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <TagTreeView
                    tags={props.tag}
                    onSelect={(tag) => {
                        console.log(tag);
                        setSelectedTag(tag);
                    }}
                ></TagTreeView>
                <Debug />
            </Box>
        </AppLayout>
    );
}

export default connector(withAuth(TagIndex));
