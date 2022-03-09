// ===================================================================
//                             Imports
// ===================================================================
import React, { SyntheticEvent, useState } from 'react';
import { Tag, TagState } from '../../redux/tags/types';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TagComponent from '../../containers/tags/tag.container';

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
    onSelect?: (tag?: Tag) => void;
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
        _event: SyntheticEvent<Element, Event>,
        nodeIds: string,
    ) => {
        const tag = props.tags.map[parseInt(nodeIds)];
        if (tag != undefined) {
            let nextTag: Tag | undefined;

            // Compute next tag
            if (selectedTag && tag.id == selectedTag.id) {
                // Unselect tag if it's already selected
                nextTag = undefined;
            } else {
                // Otherwise, use found tag
                nextTag = tag;
            }

            setSelectedTag(nextTag);

            // If onSelect is provided, call it
            if (props.onSelect) props.onSelect(nextTag);
        } else {
            //FIXME throw error
        }
    };
    return (
        <>
            {/* <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                selected={selectedTag != undefined ? selectedTag.name : ''}
                onNodeSelect={nodeSelectHandler}
                multiSelect={false}
            >
                {props.tags.rootIds.map((id) =>
                    renderTagTree(props.tags.map[id], props.tags),
                )}
            </TreeView> */}
            {props.tags.rootIds.map((id) => (
                <TagComponent
                    key={id}
                    tag={props.tags.map[id]}
                    tags={props.tags.map}
                    root
                />
            ))}
        </>
    );
}
