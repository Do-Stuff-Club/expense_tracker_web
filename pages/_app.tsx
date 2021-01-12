import React, {FC} from 'react'
import {AppProps} from 'next/app'
import {wrapper} from '../redux/store'
import '../styles/globals.css'
import axios from 'axios';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return<Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
