import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mui/material';

import TagTreeView from './tagTreeView';
import { AllTagsData } from '../../api/tag/types';
import { TagState } from '../../redux/tags/types';

type TagsProps = {
    getAllTagsAction: () => Promise<AllTagsData | undefined>;
    tag: TagState;
};

const TagsComponent = (props: TagsProps): ReactElement => {
    const { tag, getAllTagsAction } = props;
    useEffect(() => {
        getAllTagsAction();
    }, []);

    return (
        <>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <TagTreeView tags={tag}></TagTreeView>
            </Box>
        </>
    );
};

export default TagsComponent;
