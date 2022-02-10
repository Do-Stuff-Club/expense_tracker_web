// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import AppLayout from '../../components/layout/appLayout';
import { AppNavPage } from '../../components/nav/utils';
import Tags from '../../containers/tags/tags.container';

/**
 * Tag Index Page. Displays all categories and their tags. Has links to create and edit categories.
 *
 * @returns {Element} Page element
 */
const TagsPage = (): JSX.Element => {
    return (
        <AppLayout page={AppNavPage.TAGS}>
            <Tags />
        </AppLayout>
    );
};

export default TagsPage;
