import React from 'react'
import Layout from '@/components/Layout/Layout'
import CategoryLayout from '@/components/CategoryLayout/CategoryLayout'
import withAuth from '@/components/withAuth/withAuth'



function Category() {
  return (
    <Layout>
        
      <CategoryLayout></CategoryLayout>
    </Layout>
  )
}

export default withAuth(Category);