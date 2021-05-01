// ===================================================================
//                             Imports
// ===================================================================
import { Chip } from '@material-ui/core';
import React from 'react';
import {alea} from 'seedrandom';

// ===================================================================
//                            Component
// ===================================================================

type TagChipProps = {
    label: string;
    key?: number;
    onDelete?: () => void;
    color?: string;
};

/**
 * Helper function that generates a random color for a TagChip.
 * Must be deterministic based on the string.
 * Based off this excellent blog post:
 * https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 *
 * @param label - input string to hash
 * @returns CSS color string in HSL format
 */
function randomColorFromLabel(label: string): string {
    const generator = alea(label);
    const hash = generator();
    const goldenRatioConjugate = 0.618033988749895;

    const hue = ((hash + goldenRatioConjugate) % 1) * 360; // degrees
    const saturation = 80; // percent saturation
    const lightness = 80; // percent lightness

    return `hsl(${hue}deg, ${saturation}%, ${lightness}%)`;
}

export default function TagChip(props: TagChipProps): JSX.Element {
    let color;
    if (props.color === undefined) {
        color = randomColorFromLabel(props.label);
    } else {
        color = props.color;
    }
    return (
        <Chip
            size='small'
            label={props.label}
            style={{ backgroundColor: color }}
            onDelete={props.onDelete}
        />
    );
}
