// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';

import TagContainer from '../../containers/tags/tag.container';
import TreeItemComponent from './treeItem.component';

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
        <TreeItemComponent
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
        </TreeItemComponent>
    );
};

export default TagComponent;
