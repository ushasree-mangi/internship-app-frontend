import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { io } from 'socket.io-client';
import Cookies from 'js-cookie'
import ChatRequestItem from '../ChatRequestItem/ChatRequestItem';
import SentChatRequestItem from '../SentChatRequestItem/SentChatRequestItem.js';
import Chat from '../Chat/Chat.js'
import './ChatRequests.css';

const ChatRequests = () => {

    const [currentChatDetails,setCurrentChatDetails]=useState({})

     
    
    const [widthOfChatRequestsView, setWidthOfChatRequestsView] = useState("100%"); // Initial width in pixels
    const [receivedRequestsArray, setReceivedRequestsArray]=useState([])
    const [sentRequestsArray, setSentRequestsArray]=useState([])
  
    const [isShowChatView,setIsShowChatView]=useState(false)

    const showChatView=(chatId, propertyTitle,username)=>{
        setWidthOfChatRequestsView("60%")
            setIsShowChatView(true)
            setCurrentChatDetails({chatId, propertyTitle,username})

    }
    
    useEffect(()=>{

       const  getReceivedChatRequests=async()=>{

           const token=Cookies.get("jwt_token")
           const url="https://gts-rental-app.onrender.com/received-chat-requests"
           const headers= {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            }
        
        
          const response = await axios.get(url,{headers});
         
          setReceivedRequestsArray(response.data)
       }
       getReceivedChatRequests();

       const getSentChatRequests=async()=>{

        const token=Cookies.get("jwt_token")
        const url="https://gts-rental-app.onrender.com/sent-chat-requests"
        const headers= {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
         }
     
     
       const response = await axios.get(url,{headers});
      
       setSentRequestsArray(response.data)

       }

       getSentChatRequests()

       

       const socket = io('https://gts-rental-app.onrender.com', {
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

       // Listen for new product events
       socket.on('newChatRequest', (newChatRequest) => {
        console.log(newChatRequest)
        setReceivedRequestsArray((prevChatRequests) => [...prevChatRequests, newChatRequest]);
    });

    //Listen For chat status updation when owner update the chat request status
    socket.on('chatStatusUpdated', (sentRequestsArray) => {
       
        setSentRequestsArray(sentRequestsArray);
    });

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
    };

    },[])

    return (    
        
        <div className="chat-page-container" >
            <div className="requests-section" style={{ width:{widthOfChatRequestsView} }}>
                <h2>Received Chat Requests</h2>
                <div className="requests-list">
                    {receivedRequestsArray.length===0?<p>No requests</p>:receivedRequestsArray.map((request) => (
                        <ChatRequestItem key={request.chatId} showChatView={showChatView} chatRequestItemDetails={request}/>
                        
                    ))}
                </div>
                <h2>Sent Chat Requests</h2>
                <div className="requests-list">
                {sentRequestsArray.length===0?<p>No requests</p>:sentRequestsArray.map((request) => (
                        <SentChatRequestItem key={request.chatId} showChatView={showChatView} chatRequestItemDetails={request}/>
                        
                    ))}
                </div>
            </div>
            {isShowChatView&&<Chat currentChatDetails={currentChatDetails} />}
           
        </div>
       
    );
};

export default ChatRequests;
