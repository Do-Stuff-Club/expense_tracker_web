// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import TagChip from './tagChip';
import { render, screen } from '@testing-library/react';

// ===================================================================
//                              Tests
// ===================================================================

describe('TagChip component', () => {
    it('label is correct', () => {
        const tagChip = <TagChip key={0} label='hello' />;

        expect(tagChip.props.label).toEqual('hello');
    });

    it('renders its label', () => {
        render(<TagChip key={0} label='hello' />);
        expect(screen.getByText('hello')).toBeInTheDocument();
    });

    it('renders its label with provided background color', () => {
        render(<TagChip key={0} label='hello' color='blue' />);
        expect(screen.getByText('hello').parentElement).toHaveStyle({
            'background-color': 'blue',
        });
    });

    it('renders its label with a randomized background color if no color is specified', () => {
        render(<TagChip key={0} label='hello' />);
        const elem = screen.getByText('hello').parentElement;
        if (elem !== null) {
            // Need to fetch computed style to compare to regex
            const style = window.getComputedStyle(elem);
            expect(style.backgroundColor).toMatch(/rgb\(\d+, \d+, \d+\)/);
        }
    });

    it('renders its label with the same color for tags with the same string', () => {
        for (let i = 0; i < 100; i++) render(<TagChip label='hello' />);
        const chipLabels = screen.getAllByText('hello');
        const chipDivs = chipLabels.map((label) => label.parentElement);
        const colors = chipDivs.map((div) =>
            div == null ? null : window.getComputedStyle(div).backgroundColor,
        );

        // Check that all background colors are the same
        // and they are all in rgb format
        for (let i = 0; i < colors.length; i++) {
            expect(colors[i]).toMatch(/rgb\(\d+, \d+, \d+\)/);
            for (let j = i; j < colors.length; j++)
                expect(colors[i]).toEqual(colors[j]);
        }
    });
});
