import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'

import { useAuth } from '../../context/auth'
import Unauthorized from '../../pages/Unauthorized'
const Private = () => {
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()
    useEffect(()=>{
        const checkAuth=async()=>{
            const res=await axios.get(`http://localhost:8080/user/auth`)
            if(res.status===200)
            setOk(true)
            else
            setOk(false)
        }
        if(auth?.token)
        checkAuth()
    },[auth?.token])
  return ok?<Outlet/>:<Unauthorized/>
}

export default Private