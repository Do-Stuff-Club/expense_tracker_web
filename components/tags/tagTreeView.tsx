// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { TagState } from '../../redux/tags/types';

// ===================================================================
//                            Component
// ===================================================================
type TagTreeViewProps = {
    tags: TagState;
    onSelect?: () => void;
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
    // FIXME
    return <div>{JSON.stringify(props)}</div>;
}
