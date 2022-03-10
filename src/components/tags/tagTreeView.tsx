// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Tag, TagState } from '../../redux/tags/types';
import TagTreeItem from '../../containers/tags/tag.container';

// ===================================================================
//                            Component
// ===================================================================
type TagTreeViewProps = {
    tags: TagState;
    onSelect?: (tag?: Tag) => void;
};

/**
 * React component that renders a tag tree. Allows selection of exactly one module.
 *
 * @param {TagTreeViewProps} props - React properties for TagTreeView
 * @returns {Element} a hierarchical view of all tags
 */
export default function TagTreeView(props: TagTreeViewProps): JSX.Element {
    return (
        <>
            {props.tags.rootIds.map((id) => (
                <TagTreeItem
                    key={id}
                    tag={props.tags.map[id]}
                    tags={props.tags.map}
                    root
                />
            ))}
        </>
    );
}
