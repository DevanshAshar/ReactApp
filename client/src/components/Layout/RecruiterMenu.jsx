import React from 'react'
import { Link, NavLink } from "react-router-dom";
const RecruiterMenu = () => {
  return (
    <><div className="text-center">
    <div className="list-group">
      <h4 style={{color:'white'}}>Dashboard</h4>
      <Link style={{backgroundColor:'#333',color:'white'}} to="/addApplication" className="list-group-item list-group-item-action">
        Add Application
      </Link>
      <Link style={{backgroundColor:'#333',color:'white'}} to="/user/chats" className="list-group-item list-group-item-action">
        Chats
      </Link>
      <Link style={{backgroundColor:'#333',color:'white'}} to="/pastPostings" className="list-group-item list-group-item-action">
        Past Postings
      </Link>
    </div>
    </div>
    </>
  )
}

export default RecruiterMenu