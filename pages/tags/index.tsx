// ===================================================================
//                             Imports
// ===================================================================
import { RootState } from '../../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import styles from '../../styles/Home.module.css';
import tagStyles from './index.module.css';
import withAuth from '../../components/withAuthentication';
import React, { useEffect, useState } from 'react';
import { getTagsCall } from '../../api/tag/call';
import {
    fetchTagsAction,
    createTagAction,
    updateTagAction,
    deleteTagAction,
} from '../../redux/tags/action';
import TagTreeView from '../../components/tags/tagTreeView';
import TagActionPanel from '../../components/tags/tagActionPanel';
import { Tag } from '../../redux/tags/types';
import Debug from '../../components/debug';
import AppLayout from '../../components/appLayout';
import { AppNavPage } from '../../components/app/nav/utils';

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
    fetchTagsAction,
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
        getTagsCall({
            headers: props.user.authHeaders,
        }).then(
            (data) => props.fetchTagsAction(data),
            (error) => console.log(error),
        );
    }, []); // Pass an empty array so it only fires once

    const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);

    return (
        <AppLayout page={AppNavPage.TAGS}>
            <main>
                <h1 className={styles.title}>Tags!</h1>
                <div className={tagStyles.tagsPageContainer}>
                    <div className={tagStyles.tagActionContainer}>
                        <TagActionPanel
                            selectedTag={selectedTag}
                            {...props}
                        ></TagActionPanel>
                    </div>
                    <div className={tagStyles.tagsContainer}>
                        <TagTreeView
                            tags={props.tag}
                            onSelect={(tag) => {
                                console.log(tag);
                                setSelectedTag(tag);
                            }}
                        ></TagTreeView>
                    </div>
                </div>
                <Debug />
            </main>
        </AppLayout>
    );
}

export default connector(withAuth(TagIndex));
