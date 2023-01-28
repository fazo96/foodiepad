import { useRouter } from 'next/router'
import React from 'react'
import dynamic from 'next/dynamic'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'

const ShoppingListContent = dynamic(
  () => import('../../components/ShoppingListContent'),
  {
    ssr: false,
    loading: () => <PageLoadingIndicator />
  })

export default function ShoppingListPage () {
  const router = useRouter()
  const shoppingListId = router.query.shoppingListId as string

  // TODO: handle invalid id case?

  return <ShoppingListContent id={shoppingListId} />
}
