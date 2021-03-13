import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export interface AuthProps {
    auth: {
        loggedIn: boolean;
    };
}

export default function withAuth<BaseProps extends AuthProps>(
    WrappedComponent: React.ComponentType<BaseProps>,
) {
    return (props: BaseProps) => {
        const [cookies, setCookie, removeCookie] = useCookies();

        console.log('Cookies!');
        console.log(cookies);
        const router = useRouter();
        useEffect(() => {
            if (!props.auth.loggedIn) {
                if (cookies.hasOwnProperty('authHeaders')) {
                    // Dispatch action to load authHeaders from cookie
                    //FIXME
                } else {
                    router.push('/login');
                }
            }
        });

        if (props.auth.loggedIn)
            return <WrappedComponent {...(props as BaseProps)} />;
        else return <div>You are not logged in. Redirecting to login...</div>;
    };
}
