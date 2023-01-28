import { CircularProgress } from '@mui/material'
import { memo } from 'react'

function PageLoadingIndicator () {
  return <CircularProgress />
}

export default memo(PageLoadingIndicator)
