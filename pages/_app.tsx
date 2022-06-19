import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RelayEnvironmentProvider } from 'react-relay'
import { relayEnvironment } from '../lib/relayEnvironment'
import Head from 'next/head'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
    </>
  )
}

export default MyApp
