// ===================================================================
//                             Imports
// ===================================================================
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// ===================================================================
//                            Component
// ===================================================================
export interface AuthProps {
    auth: {
        loggedIn: boolean;
    };
}
/**
 * Higher-order component used to wrap pages that require authentication. This includes
 * application pages for expenses, tags, and dashboards. Redirects users to login if they
 * are not authenticated.
 *
 * @param {React.ComponentType} WrappedComponent - component to wrap with Auth
 * @returns {Element} a page component wrapped in an authentication check
 */
export default function withAuth<BaseProps extends AuthProps>(
    WrappedComponent: React.ComponentType<BaseProps>,
) {
    return (props: BaseProps): JSX.Element => {
        console.log('Cookies!');
        const router = useRouter();
        useEffect(() => {
            if (!props.auth.loggedIn) {
                router.push('/login');
            }
        });

        if (props.auth.loggedIn)
            return <WrappedComponent {...(props as BaseProps)} />;
        else return <div>You are not logged in. Redirecting to login...</div>;
    };
}
