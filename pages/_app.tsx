// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import '../styles/globals.css';

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
    return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
