import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RelayEnvironmentProvider } from 'react-relay'
import {relayEnvironment} from "../lib/relayEnvironment";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  )
}

export default MyApp
