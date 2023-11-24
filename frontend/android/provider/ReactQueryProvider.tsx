import React from 'react'

import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

type Props = {
    children: React.ReactNode
}

const queryClient = new QueryClient()
const ReactQueryProvider = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider