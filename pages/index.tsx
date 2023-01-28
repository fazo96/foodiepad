import React from 'react'
import dynamic from 'next/dynamic'
import PageLoadingIndicator from '../components/PageLoadingIndicator'

const ShoppingLists = dynamic(
  () => import('../components/ShoppingLists'),
  {
    ssr: false,
    loading: () => <PageLoadingIndicator />
  })

export default function Homepage () {
  return <ShoppingLists />
}
