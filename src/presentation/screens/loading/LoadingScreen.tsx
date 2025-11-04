import React from 'react'
import { Layout, Spinner, Text } from '@ui-kitten/components'

const LoadingScreen = () => {
  return (
    <Layout
    >
      <Spinner status='primary' size='large'/>
    </Layout>
  )
}

export default LoadingScreen
