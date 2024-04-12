import React, { useEffect, useState } from 'react';
import './conversation.css';
import axios from 'axios';

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const friendId = conversation.userId1!=currentUser.id?conversation.userId1:conversation.userId2
    console.log(friendId)
    const getUser = async () => {
      try {
        const res = await axios.post('http://localhost:8080/user/userData', {
          userId: friendId,
        });
        // console.log(res.data)
        setUser(res.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='conversation'>
      <span className="conversationName">{user?.firstName}</span>
    </div>
  );
};

export default Conversation;
