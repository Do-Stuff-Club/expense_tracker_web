// ===================================================================
//                             Imports
// ===================================================================
import React, { ChangeEvent, useState } from 'react';
import { Tag, TagState } from '../../redux/tags/types';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

/**
 * Recursively renders a tag tree using TreeItems.
 *
 * @param {Tag} tag - The root tag
 * @param {TagState} state - The state to look up the children nodes
 * @returns {Element} a TreeItem based on the root tag.
 */
function renderTagTree(tag: Tag, state: TagState): JSX.Element {
    return (
        <TreeItem key={tag.id} nodeId={tag.id.toString()} label={tag.name}>
            {tag.childIds.map((childId) =>
                renderTagTree(state.map[childId], state),
            )}
        </TreeItem>
    );
}

// ===================================================================
//                            Component
// ===================================================================
type TagTreeViewProps = {
    tags: TagState;
    onSelect?: (tag: Tag) => void;
};

/**
 * React component that renders a tag tree. Allows selection of exactly one module.
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {TagTreeViewProps} props - React properties for TagTreeView
 * @returns {Element} a hierarchical view of all tags
 */
export default function TagTreeView(props: TagTreeViewProps): JSX.Element {
    const [selectedTag, setSelectedTag] = useState<Tag>();

    const nodeSelectHandler = (
        _event: ChangeEvent<Record<string, never>>,
        nodeIds: string,
    ) => {
        const tag = props.tags.map[parseInt(nodeIds)];
        if (tag != undefined) {
            if (props.onSelect != undefined) props.onSelect(tag);
            setSelectedTag(tag);
        }
    };
    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected={selectedTag != undefined ? selectedTag.name : ''}
            onNodeSelect={nodeSelectHandler}
            multiSelect={false}
        >
            {props.tags.rootIds.map((id) =>
                renderTagTree(props.tags.map[id], props.tags),
            )}
        </TreeView>
    );
}
