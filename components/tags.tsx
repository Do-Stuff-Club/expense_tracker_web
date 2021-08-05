// ===================================================================
//                             Imports
// ===================================================================
import React, { useState } from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as TagData from '../temp_data/tree';
import { TagTree, TagState } from '../temp_data/tree'; //add TagState back in
import { TextField, Button } from '@material-ui/core';
// import FormButton from './formButton';

/**
 *
 * @returns {Element} A Tree view of all tags
 */
export default function Tags(): JSX.Element {
    const [tagState, setTagState] = useState<TagState>(TagData.dummyTree);
    // const [currentSelection, setCurrentSelection] = useState<string>('');
    const [newTagName, setNewTagName] = useState<string>('');
    // const tagState = TagData.dummyTree;

    const renderTree = (nodes: TagTree) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id.toString()}
            label={nodes.name}
        >
            {console.log(nodes.name)}
            {Array.isArray(nodes.childrenIds)
                ? nodes.childrenIds.map((childrenId) =>
                      renderTree(tagState.map.get(childrenId) as TagTree),
                  )
                : null}
        </TreeItem>
    );

    const addNode = (nodeName: string) => {
        const newId = tagState.map.size;
        const newNode: TagTree = {
            name: nodeName,
            id: newId,
        };

        setTagState({
            map: tagState.map.set(newId, newNode),
            rootIds: [...tagState.rootIds, ...[newId]],
        });

        setNewTagName('');
    };

    return (
        <div>
            <div>
                <span>Add a new tag: </span>
                <TextField
                    value={newTagName}
                    onChange={(event) =>
                        setNewTagName(
                            event.target.value ? event.target.value : '',
                        )
                    }
                ></TextField>
                <Button onClick={() => addNode(newTagName)}>+</Button>
            </div>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {tagState.rootIds.map((id) => {
                    console.log(tagState.map.get(id));
                    return renderTree(tagState.map.get(id) as TagTree);
                })}
            </TreeView>
        </div>
    );
}
