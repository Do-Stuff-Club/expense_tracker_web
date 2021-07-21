// ===================================================================
//                             Imports
// ===================================================================
import React from 'react'; //add useState back in
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as TagData from '../temp_data/tree';
import { TagTree } from '../temp_data/tree'; //add TagState back in

/**
 *
 * @returns {Element} A Tree view of all tags
 */
export default function Tags(): JSX.Element {
    //const [tagState, setTagState] = useState<TagState>(TagData.dummyTree);
    const tagState = TagData.dummyTree;

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

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {tagState.rootIds.map((id) => {
                console.log(tagState.map.get(id));
                return renderTree(tagState.map.get(id) as TagTree);
            })}
        </TreeView>
    );
}
