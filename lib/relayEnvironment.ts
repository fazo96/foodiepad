import { Environment, GraphQLResponse, Network, RecordSource, RequestParameters, Store } from 'relay-runtime'
import { Variables } from 'react-relay'

async function fetchGraphQL (text: string | null | undefined, variables: Variables) {
  const apiUrl = '/api/v1/graphql'
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: text,
      variables
    })
  }
  if (typeof window === typeof undefined) {
    const server = (await import('../pages/api/v1/graphql')).default
    const response = await (await server.fetch(apiUrl, init)).json()
    return response
  } else {
    const url = `${location.origin}${apiUrl}`
    const response = await (await fetch(url, init)).json()
    return response
  }
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay (params: RequestParameters, variables: Variables): Promise<GraphQLResponse> {
  // TODO: figure out typings here
  return fetchGraphQL(params.text, variables) as unknown as GraphQLResponse
}

// Export a singleton instance of Relay Environment configured with our network function:
export const relayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource())
})
