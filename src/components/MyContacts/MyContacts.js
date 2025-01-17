import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import SentChatRequestItem from '../SentChatRequestItem'
import Header from '../Header'
import Cookies from 'js-cookie'
import {useState,useEffect} from 'react'
import axios from 'axios'
import  './MyContacts.css'

const MyContacts=()=>{

     const [sentRequestsArray,setSentRequestsArray]=useState([])

     useEffect(()=>{

    
 
        const getSentChatRequests=async()=>{
 
         const token=Cookies.get("jwt_token")
         const url="http://localhost:4000/sent-chat-requests"
         const headers= {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          }
      
      
        const response = await axios.get(url,{headers});
       
        setSentRequestsArray(response.data)
 
        }
 
        getSentChatRequests()
 
        
 
       
 
     },[])

    return(
        <> <Header/>
        <div className='my-contacts-page-container'>
            <ProfileSidebar/>
            <div className='my-contacts-page-content-container'>
                <h1>MyContacts page</h1>
                <h2>Chat Requests</h2>
                <div className="requests-list">
                {sentRequestsArray.length===0?<p>No requests</p>:sentRequestsArray.map((request) => (
                        <SentChatRequestItem key={request.chatId}  chatRequestItemDetails={request}/>
                        
                    ))}
                </div>
            </div>
        </div>
        </> 
        
    )

}

export default MyContacts