import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import './index.css'
import { io } from 'socket.io-client';

const Chat=(props)=>{

    const {currentChatDetails}=props
    const {chatId, propertyTitle,username}=currentChatDetails
   
   
    
    const [messages, setMessages] = useState( []);
      
  console.log("inside chat component messages array")
  console.log("messages")
  console.log(messages);
  
  
  const [messageContent, setMessageContent] = useState("");

  useEffect(()=>{
    console.log("effect is executing..")

    const getChatMessages=async()=>{
        const token=Cookies.get("jwt_token")

       
        const url=`http://localhost:4000/get-chat-messages?chatId=${chatId}`
       
    

        const headers= {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          }
      
      
     
      
        const response = await axios.get(url,{headers});
        console.log(response)
        console.log(response.data)
      if(response.status===201){
            setMessages(response.data)
        }
    }

    getChatMessages();


    const socket = io('http://localhost:4000', {
      path: '/socket.io',  // Same WebSocket path as server
      transports: ['websocket', 'polling'], // Include polling
    });

    socket.on('connect', () => {
      console.log('Socket.IO connected');
    });
    
    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });
    const userId=localStorage.getItem('userId');

  
    socket.emit('registerUser', userId); // Register user with WebSocket

     // Listen for new Message events
     socket.on('newMessage', (newMessage) => {
      console.log(newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  });

  

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
  };

  },[chatId])

  const handleSendMessage = async() => {
    if (messageContent.trim() !== "") {

      const token=Cookies.get("jwt_token")
      console.log(`inside chat :${token}`)
      const url="http://localhost:4000/add-chat-message"
      const headers= {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`,
       }
       console.log(messageContent)
      const body={
        chatId,messageContent
      }
   
      const response = await axios.post(url,body,{headers});
     /* if(response.status===201){ 
        setMessages([...messages, { sender: "You", text: input }]);
      }*/
      setMessageContent("");
    }
  };

    return (
        <>
       
        <div className="chat-page">
            <div className="chat-header">Chat Room {chatId} <p>{username}</p><p>{propertyTitle}</p></div>
            <p className='chat-info-label'>receiver message</p><p className='chat-info-label'>sender message</p>
                <div className="chat-body">
                    {messages.map((message) =>{ 
                      
                    const senderMessage=<div key={message.messageId} className="chat-message">
                        
                        <p className="sender-message-text">{message.content}</p>
                        
                    </div>
                    const receiverMessage=<div key={message.messageId} className="chat-message">
                        
                    <p className="receiver-message-text">{message.content}</p>
                    
                </div>
                    const userId=localStorage.getItem('userId')
                    if(message.senderId===userId){
                        return senderMessage
                    }
                    return receiverMessage
              })}
                </div>
                <div className="chat-footer">
                    <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="chat-input"
                    />
                    <button onClick={handleSendMessage} className="send-button">
                    Send
                    </button>
                </div>
        </div>
  
        </>
    )

}

export default Chat