// ===================================================================
//                             Imports
// ===================================================================
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/auth.helper';

// ===================================================================
//                            Component
// ===================================================================
/**
 * Higher-order component used to wrap pages that require authentication. This includes
 * application pages for expenses, tags, and dashboards. Redirects users to login if they
 * are not authenticated.
 *
 * @param {React.ComponentType} WrappedComponent - component to wrap with Auth
 * @returns {Element} a page component wrapped in an authentication check
 */
export default function withAuth<BaseProps>(
    WrappedComponent: React.ComponentType<BaseProps>,
): React.ComponentType<BaseProps> {
    WrappedComponent.displayName = 'WithAuth: ' + WrappedComponent.displayName;
    const component: React.ComponentType<BaseProps> = (
        props: BaseProps,
    ): JSX.Element => {
        const router = useRouter();
        useEffect(() => {
            if (!isAuthenticated()) {
                router.push('/login');
            }
        }, []);

        if (isAuthenticated())
            return <WrappedComponent {...(props as BaseProps)} />;
        else return <div>You are not logged in. Redirecting to login...</div>;
    };
    return component;
}
