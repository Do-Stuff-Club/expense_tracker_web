// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import NavBreadcrumbs from './navBreadcrumbs';
import { render, screen } from '@testing-library/react';

// ===================================================================
//                              Tests
// ===================================================================

test('NavBreadcrumbs has labels for Dashboard, Tags, Expenses', () => {
    render(<NavBreadcrumbs></NavBreadcrumbs>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
});

test('NavBreadcrumbs link elements include href to Dashboard, Tags, Expenses pages', () => {
    render(<NavBreadcrumbs></NavBreadcrumbs>);
    expect(screen.getByText('Dashboard')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Tags')).toHaveAttribute('href', '/category');
    expect(screen.getByText('Expenses')).toHaveAttribute('href', '/expense');
});
