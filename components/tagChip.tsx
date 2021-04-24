// ===================================================================
//                             Imports
// ===================================================================
import { Chip } from '@material-ui/core';
import React from 'react';

// ===================================================================
//                            Component
// ===================================================================

type TagChipProps = {
    label: string;
    key: number;
    onDelete: () => void;
};

export default function TagChip(props: TagChipProps): JSX.Element {
    return <Chip size='small' label={props.label} onDelete={props.onDelete} />;
}
