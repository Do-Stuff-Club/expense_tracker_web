import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import TagTreeView from './tagTreeView';
import TagActionDrawer from '../../containers/tags/tags.ActionDrawer.container';
import { AllTagsData } from '../../api/tag/types';
import { Tag, TagState } from '../../redux/tags/types';

type TagsProps = {
    getAllTagsAction: () => Promise<AllTagsData | undefined>;
    tag: TagState;
};

const TagsComponent = (props: TagsProps): ReactElement => {
    const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);

    const { tag, getAllTagsAction } = props;
    useEffect(() => {
        getAllTagsAction();
    }, []);

    return (
        <>
            <TagActionDrawer selectedTag={selectedTag}></TagActionDrawer>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <TagTreeView
                    tags={tag}
                    onSelect={(tag) => {
                        console.log(tag);
                        setSelectedTag(tag);
                    }}
                ></TagTreeView>
                {/* <Debug /> */}
            </Box>
        </>
    );
};

export default TagsComponent;
