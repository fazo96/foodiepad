import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RelayEnvironmentProvider } from 'react-relay'
import { relayEnvironment } from '../lib/relayEnvironment'
import Head from 'next/head'
import { memo } from 'react'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="HandheldFriendly" content="true" />
        <title>Foodiepad</title>
      </Head>
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
    </>
  )
}

export default memo(MyApp)
