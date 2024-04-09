import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAuth } from '../../context/auth'
import Unauthorized from '../../pages/Unauthorized'
const Private = () => {
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()
    useEffect(()=>{
        console.log(auth)
        const checkAuth=async()=>{
            const res=await axios.get(`http://localhost:8080/user/auth`)
            if(res.status===200)
            {
                const us=localStorage.getItem("auth") || Cookies.get('user')
                console.log(us)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:JSON.parse(us).token || Cookies.get('sessionid')
                  })
                localStorage.setItem("auth", JSON.stringify({user:res.data,token:JSON.parse(us).token}));
            setOk(true)
            }
            else
            setOk(false)
        }
        if(auth?.token)
        checkAuth()
    },[auth?.token])
    // useEffect(() => {
    //     const token = Cookies.get('sessionid');  
    //     const user= Cookies.get('user')
    //     if(token && user)
    //     setAuth({
    //       ...auth,
    //       user:JSON.parse(user),
    //       token:token
    //     })
    //     console.log(auth)
    //   }, []);
  return ok?<Outlet/>:<Unauthorized/>
}

export default Private