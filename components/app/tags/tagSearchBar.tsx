// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Tag, TagState } from '../../../redux/tags/types';

// ===================================================================
//                            Component
// ===================================================================
type TagSearchBarProps = {
    tags: TagState;
    onPick?: (tag: Tag) => void;
};

/**
 * React component for searching through tags. Users can search, and a dropdown will show possible tag matches. A user selects a single tag out of these, which is then passed to a provided handler for further processing
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {TagSearchBarProps} props - React properties for TagSearchBar
 * @returns {Element} a search bar that lets you select a single tag
 */
export default function TagSearchBar(props: TagSearchBarProps): JSX.Element {
    // FIXME
    return <div>{JSON.stringify(props)}</div>;
}
