// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBreadcrumbs from './navBreadcrumbs';
import userEvent from '@testing-library/user-event';

// ===================================================================
//                              Tests
// ===================================================================

describe('navBreadcrumbs component', () => {
    it('renders the nav labels', () => {
        render(<NavBreadcrumbs />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Tags')).toBeInTheDocument();
        expect(screen.getByText('Expenses')).toBeInTheDocument();
    });

    // One of the limitations of the Jest DOM simulator is that you can't
    // change locations, so we check hrefs instead.
    it('has the correct hrefs for each breadcrumb', () => {
        render(<NavBreadcrumbs />);

        expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute(
            'href',
            '/dashboard',
        );
        expect(screen.getByText('Tags').closest('a')).toHaveAttribute(
            'href',
            '/tags',
        );
        expect(screen.getByText('Expenses').closest('a')).toHaveAttribute(
            'href',
            '/expenses',
        );
    });
});
