import React from 'react'
import './message.css'
const Message = ({message,own}) => {
  return (
    <div className={own ? "message own" : "message"}>
        <div className='messageTop'>
            <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'></div>
    </div>
  )
}

export default Message
