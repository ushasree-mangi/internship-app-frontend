import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import './Chat.css';
import { io } from 'socket.io-client';
import { MdCall } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { BiBuildings, BiSolidBank } from 'react-icons/bi';
import { TiEyeOutline } from 'react-icons/ti';

const Chat = (props) => {
  const { currentChatDetails } = props;
  const { chatId, propertyTitle, username, price } = currentChatDetails;

  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    console.log("chat ui effect is executing")
    const getChatMessages = async () => {
      const token = Cookies.get("jwt_token");
      const url = `http://localhost:4000/get-chat-messages?chatId=${chatId}`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 201) {
        setMessages(response.data);
      }
    };

    getChatMessages();

    const socket = io('http://localhost:4000', {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Socket.IO connected');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });

    const userId = localStorage.getItem('userId');
    socket.emit('registerUser', userId);

    socket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (messageContent.trim() !== "") {
      const token = Cookies.get("jwt_token");
      const url = "http://localhost:4000/add-chat-message";
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const body = { chatId, messageContent };
      await axios.post(url, body, { headers });
      setMessageContent("");
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-user-icon">{username.split(' ').map((name) => name[0]).join('')}</div>
        <p className='chat-user-name'>{username}</p>
        <button className='chat-seller-button'>Seller</button>
        <MdCall className='chat-call-icon' />
        <RxCross2 className='chat-close-icon' />
      </div>
      <div className='chat-sub-header'>
        <BiBuildings className='chat-building-icon' />
        <p className='chat-propertytitle'>{propertyTitle}</p>
        <BiSolidBank className='chat-bank-icon' />
        <p>{price}</p>
        <TiEyeOutline className='chat-eye-icon' /><p className='chat-view-text'>View</p>
      </div>
      <div className="chat-body">
        {messages.map((message) => {
          const userId = localStorage.getItem('userId');
          return (
            <div
              key={message.messageId}
              className={`chat-message ${message.senderId === userId ? 'sender' : 'receiver'
                }`}
            >
              <p>{message.content}</p>
            </div>
          );
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
        <button onClick={handleSendMessage} className="chat-seller-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat; 