// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import TagChip from '../components/tagChip';
import { shallow } from 'enzyme';

// ===================================================================
//                              Tests
// ===================================================================

test('TagChip label is correct', () => {
    const tagChip = <TagChip key={0} label='hello' />;

    expect(tagChip.props.label).toEqual('hello');
});
