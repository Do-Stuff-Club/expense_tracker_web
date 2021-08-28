// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@material-ui/core';

// ===================================================================
//                            Component
// ===================================================================

/**
 * Breadcrumbs-style navigation menu between for navigating between Dashboard, Expenses, and Tags
 *
 * @returns {Element} Breadcrumb element
 */
export default function NavBreadcrumbs(): JSX.Element {
    return (
        <Breadcrumbs>
            <Link href='/dashboard'>
                <a>Dashboard</a>
            </Link>
            <Link href='/tags'>
                <a>Tags</a>
            </Link>
            <Link href='/expenses'>
                <a>Expenses</a>
            </Link>
        </Breadcrumbs>
    );
}
