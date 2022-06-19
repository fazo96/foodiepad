import dynamic from 'next/dynamic'

const ShoppingList = dynamic(() => import('../components/ShoppingList'), { ssr: false })

export default function Index () {
  return <ShoppingList />
}
