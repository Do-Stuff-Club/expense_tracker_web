import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@material-ui/core';

export default function NavBreadcrumbs(): JSX.Element {
    return (
        <Breadcrumbs>
            <Link href='/category'>
                <a>Tags</a>
            </Link>
            <Link href='/expense'>
                <a>Expenses</a>
            </Link>
        </Breadcrumbs>
    );
}
