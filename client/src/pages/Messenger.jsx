import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../context/auth";
import Conversation from "../components/Chat/Conversation";
import Message from "../components/Chat/Message";
import Layout from "../components/Layout/Layout";
const Messenger = () => {
  const [auth, setAuth] = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [uniqueMessages, setUniqueMessages] = useState([]);
  const [chattingWithName,setChattingWithName]=useState()
  const user = auth.user;
  const scrollRef = useRef();
  const socket = useRef();

//   useEffect(() => {
//     socket.current = io("ws://localhost:8080");
//   }, []);
//   useEffect(()=>{
//     socket.current.on("getMessage", (data) => {
//         setArrivalMessage({
//             sender: data.senderId,
//             text: data.text,
//         });
//     });
//   },[])
//   useEffect(() => {
//     // console.log(user)
//     socket.current.emit("addUser", user.id);
//     socket.current.on("getUsers", (users) => {
//         console.log('gettetet')
//       console.log(users);
//     });
//   }, [user]);
    useEffect(()=>{
        if(localStorage.getItem('chatt'))
        {
            const curConv=JSON.parse(localStorage.getItem('chatt'))
            setCurrentChat(curConv)
            // console.log(currentChat)
            const otherUserId =curConv.userId1 === user.id ? curConv.userId2 : curConv.userId1;
            const fetchData=async()=>{
    try {
      const res = await axios.post(`http://localhost:8080/user/userData`,{userId:otherUserId});
      setChattingWithName(res.data.firstName); 
    } catch (error) {
      console.log(error.message);
    }
}
fetchData()
        }
    },[])
  useEffect(() => {
    const combinedMessages = [...messages, ...(arrivalMessage ? [arrivalMessage] : [])];
    const uniqueMessageIds = new Set(combinedMessages.map((message) => message.id));
    const filteredMessages = combinedMessages.filter((message) => !uniqueMessageIds.has(message.id));
    setUniqueMessages(filteredMessages);
  }, [messages, arrivalMessage]);
  useEffect(() => {

    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage])
  const getConversations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/convo/convoByUser"
      );
      console.log(res.data)
      setConversations(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMessages = async () => {
    try {
      if (currentChat) {
        const res = await axios.post(
          "http://localhost:8080/msg/allMsgs",
          { conversationId: currentChat.id }
        );
        setMessages(res.data || []); 
      } else {
        setMessages([]); 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(currentChat)
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    getConversations();
  }, [user?.id]);

  const receiverId = currentChat
    ? (currentChat.userId1!=user.id?currentChat.userId1:currentChat.userId2)
    : null;
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentChat) {
      console.log("No conversation selected.");
      return;
    }


    // if (receiverId) {
    //   socket.current.emit("sendMessage", {
    //     senderId: user?.id,
    //     receiverId: receiverId,
    //     text: newMessage,
    //   });
    // }

    try {
      const res = await axios.post(
        "http://localhost:8080/msg/sendMsg",
        {convoId:currentChat.id,text:newMessage}
      );

      setMessages([...messages, res.data]);
      setNewMessage(""); 
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleChatSelection = async (selectedConversation) => {
    setCurrentChat(selectedConversation);
    const otherUserId = selectedConversation.userId1 === user.id ? selectedConversation.userId2 : selectedConversation.userId1;
    try {
      const res = await axios.post(`http://localhost:8080/user/userData`,{userId:otherUserId});
      setChattingWithName(res.data.firstName); 
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCloseChat = async () => {
    if (!currentChat) {
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/convo/closeChat/${currentChat.id}`);
      if (res.status === 200) {
        setCurrentChat({ ...currentChat, closed: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleOpenChat = async () => {
    if (!currentChat) {
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/convo/openChat/${currentChat.id}`);
      if (res.status === 200) {
        setCurrentChat({ ...currentChat, closed: false });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Layout>
    <div className="messenger">
      <div className="chatMenu">
        {/* <input placeholder="Search" className="chatMenuInput" /> */}
        {conversations.map((c) => (
          <div key={c.id} onClick={() => handleChatSelection(c)}>
            <Conversation conversation={c} currentUser={user} />
          </div>
        ))}
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
              <h3 style={{color:'white'}}>Chatting with:{chattingWithName} </h3>
              {user.id === currentChat.userId1 &&( !currentChat.closed ? (
                    <button className='btn btn-danger'onClick={handleCloseChat}>Terminate Chat</button>
                  ) : <button className='btn btn-success'onClick={handleOpenChat}>Open Chat</button>)}
                {messages.length > 0 ? (
                  messages.map((m) => (
                    <div key={m.id} ref={scrollRef}>
                      <Message
                        message={m}
                        // sender={m.senderName}
                        own={m.sender === user?.id}
                      />
                    </div>
                  ))
                ) : (
                  <span className="noMessageText">No messages yet</span>
                )}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="Write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  disabled={currentChat.closed}
                />
                <button
                  className="chatSubmitButton"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">Start a conversation</span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Messenger;
