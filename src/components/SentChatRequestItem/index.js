

import './index.css'

const SentChatRequestItem=(props)=>{ 



    const {chatRequestItemDetails, showChatView}=props 
    const {chatId,username,propertyTitle ,status}=chatRequestItemDetails;
    
   
   
    
    
   

    const onClickSendMessage=()=>{
          showChatView(chatId, propertyTitle,username)
    }

  

    
    return(
        <div className="request-card" key={chatId}>
                            <h3>Property Title: {propertyTitle}</h3>
                            <p>Owner Name : {username}</p>
                            <p>Chat Request Status: {status}</p>
                          
                            {status==="accepted"&&<button onClick={onClickSendMessage} className='send-message-btn'>send message</button>}
                        </div>
    )

} 

export default SentChatRequestItem;