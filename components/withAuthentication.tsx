import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export interface AuthProps {
    auth: {
        loggedIn: boolean;
    };
}

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
