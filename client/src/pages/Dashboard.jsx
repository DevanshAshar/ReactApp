import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const Dashboard = () => {
    const [auth]=useAuth()
    console.log(auth.user)
  return (
    <Layout>
        <h1>Hello {auth?.user?.firstName}</h1>
        {auth?.user?.detailsFilled?
        <>
        </>:<>
        </>}
    </Layout>
  )
}

export default Dashboard