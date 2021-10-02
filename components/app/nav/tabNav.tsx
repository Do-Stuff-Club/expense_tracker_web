// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import Link from 'next/link';
import { Tabs, Tab } from '@mui/material';
import { AppNavPage, pageLink, pages, pageTitle } from './utils';
import PropTypes from 'prop-types';

// ===================================================================
//                             Helpers
// ===================================================================
// StepButton wrapped with Next.js Link
const NextLinkA = React.forwardRef<
    HTMLAnchorElement,
    { href: string } & React.HTMLProps<HTMLAnchorElement>
>((props, ref) => (
    <Link href={props.href}>
        <a {...props} ref={ref}></a>
    </Link>
));
NextLinkA.displayName = 'NextLinkA';
NextLinkA.propTypes = {
    href: PropTypes.string.isRequired,
};
// ===================================================================
//                            Component
// ===================================================================
type TabNavProps = {
    page: AppNavPage;
};

/**
 * App Bar for expense tracker app. Contains navigation links to
 * dashboard, expenses, and tags.
 *
 * @param {TabNavProps} props - Props containing the page being used
 *
 * @returns {Element} AppBar element
 */
export default function TabNav(props: TabNavProps): JSX.Element {
    let value: number;
    if (props.page == AppNavPage.TAGS) value = 0;
    else if (props.page == AppNavPage.EXPENSES) value = 1;
    else value = 2;
    return (
        <Tabs value={value}>
            {pages.map((page) => (
                <Tab
                    key={page}
                    label={pageTitle(page)}
                    component={NextLinkA}
                    href={pageLink(page)}
                />
            ))}
        </Tabs>
    );
}
