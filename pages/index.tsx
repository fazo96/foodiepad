import ShoppingList from '../components/ShoppingList'

export default function Index () {
  return <ShoppingList />
}

export function getInitialProps () {
  // This is needed so that Next.js does not try to pre-render this page, causing a crash due to Relay.
  return {}
}
