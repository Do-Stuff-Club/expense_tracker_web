// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import TagChip from '../components/tagChip';
import { render, screen } from '@testing-library/react'

// ===================================================================
//                              Tests
// ===================================================================

test('TagChip label is correct', () => {
    const tagChip = <TagChip key={0} label='hello' />;

    expect(tagChip.props.label).toEqual('hello');
});

test('TagChip renders its label', () => {
    render(<TagChip key={0} label='hello'/>);
    expect(screen.getByText('hello')).toBeInTheDocument();
});
