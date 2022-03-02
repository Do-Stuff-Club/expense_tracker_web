// ===================================================================
//                             Imports
// ===================================================================
import { useState } from 'react';
import { Expense } from '../../redux/expenses/types';
import { Tag, TagState } from '../../redux/tags/types';
import TagTreeView from '../tags/tagTreeView';

// ===================================================================
//                            Component
// ===================================================================
type InteractiveWidgetProps = {
    expenses: readonly Expense[];
    tagState: TagState;
};

export default function InteractiveWidget(
    props: InteractiveWidgetProps,
): JSX.Element {
    const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);

    return (
        <>
            <TagTreeView tags={props.tagState} />
        </>
    );
}
