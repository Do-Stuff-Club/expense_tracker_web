// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';

import TagContainer from '../../containers/tags/tag.container';
import TreeItem from './treeItem.component';

import { Tag } from '../../redux/tags/types';
import { OneTagData, UpdateTagParams } from '../../api/tag/types';

type TagComponentProps = {
    tag: Tag;
    tags: Record<number, Tag>;
    root: boolean;

    // TODO: add other actions (add new tag, move tag, delete tag)
    updateTagAction: (data: UpdateTagParams) => Promise<OneTagData | undefined>;
};

// ===================================================================
//                            Component
// ===================================================================
//TODO: custom tree item component should be replace with the mui one
/**
 * Renders hierarchical view of a single tag
 *
 * @param {TagComponentProps} props - Tag component props
 * @returns {Element} a hierarchical view of a single tag
 */
const TagComponent = (props: TagComponentProps): JSX.Element => {
    const {
        tag,
        tag: { childIds },
        tags,
        root,
        updateTagAction,
    } = props;

    return (
        <TreeItem
            treeItem={tag}
            updateTreeItemAction={updateTagAction}
            expandable={childIds.length > 0}
            isRootItem={root}
        >
            {childIds.map((id) => (
                <TagContainer
                    key={id}
                    tag={tags[id]}
                    tags={tags}
                    root={false}
                />
            ))}
        </TreeItem>
    );
};

export default TagComponent;
