import React from 'react'
// import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import {Toaster} from 'react-hot-toast'
const Layout = (props) => {
  return (
    <>
    <Navbar/>
    <main style={{minHeight:'80vh'}}>
      <Toaster/>
    {props.children}
    </main>
    <Footer/>
    </>
  )
}

export default Layout