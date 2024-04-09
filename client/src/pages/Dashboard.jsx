import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import UserMenu from '../components/Layout/UserMenu'
import RecruiterMenu from '../components/Layout/RecruiterMenu'
import Cookies from 'js-cookie';
const Dashboard = () => {
    const [auth,setAuth]=useAuth()
    console.log(auth)
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
    //     localStorage.setItem('auth',JSON.stringify(auth))
    //   }, []);
  return (
    <Layout>
        <div className="container-fluid p-3 m-3">
        <div className="row">
        <div className="col-md-2">
            {auth?.user?.role==='employee'?<>
            <UserMenu/>
            </>:<>
                <RecruiterMenu/>
            </>}
          </div> 
          <div className="col-md-9">           
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Dashboard