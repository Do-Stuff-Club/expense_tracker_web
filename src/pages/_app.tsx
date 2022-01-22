// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import AppThemeProvider from '../components/theme/AppThemeProvider';
import dynamic from 'next/dynamic';

// ===================================================================
//                            Component
// ===================================================================

/**
 * Next.js special app component. See here for more details:
 * https://nextjs.org/docs/advanced-features/custom-app
 *
 * @param {AppProps} props - special Nextjs props
 * @returns {Element} Page element
 */
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppThemeProvider>
            <Component {...pageProps} />
        </AppThemeProvider>
    );
}

// This is used disable SSR or Server Side Rendering.
export default dynamic(() => Promise.resolve(wrapper.withRedux(MyApp)), {
    ssr: false,
});
