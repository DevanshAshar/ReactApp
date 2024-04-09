import React from 'react'
import { Link, NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <><div className="text-center">
    <div className="list-group">
      <h4 style={{color:'white'}}>Dashboard</h4>
      <Link style={{backgroundColor:'#333',color:'white'}} to="/user/profile" className="list-group-item list-group-item-action">
        Profile
      </Link>
      <Link style={{backgroundColor:'#333',color:'white'}} to="/user/chats" className="list-group-item list-group-item-action">
        Chats
      </Link>
      {/* <Link style={{backgroundColor:'#333',color:'white'}} to="/user/applications" className="list-group-item list-group-item-action">
        Applications
      </Link> */}
      <Link style={{backgroundColor:'#333',color:'white'}} to="/myApplied" className="list-group-item list-group-item-action">
        My Applied
      </Link>
    </div>  
    </div>
    </>
  )
}

export default UserMenu