import axios  from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import './PropertyItem.css'

const PropertyCard=(props)=>{

    const {propertyDetails}=props
    
    const [isShowChatRequestStatus , setIsShowChatRequestStatus]=useState(false)

    const {propertyId,propertyTitle,price, description}=propertyDetails
    var status="pending"
    var {status}=propertyDetails
    const [propertyStatus,setPropertyStatus]=useState(status)
    
  const jwtToken=Cookies.get("jwt_token")
    const sendChatRequest=async()=>{
        const token = Cookies.get('jwt_token')
        const url="http://localhost:4000/chat-request"
        const headers= {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            }
        
        const body={
                propertyId,
        }
       
        const response = await axios.post(url,body,{headers});
       if(response.status===201){
        setIsShowChatRequestStatus(true)
        setPropertyStatus('pending')
       }

    }
    const onClickChat=()=>{
        sendChatRequest()
    }

    return (
        

        <li className="property-card">
                    
                    <div className="property-details">
                        <h3><strong>Title : </strong>{propertyTitle}</h3>
                        <p><strong>Price:</strong> {price}</p>
                        <p><strong>Description:</strong> {description}</p>
                       {(jwtToken!==undefined) && <div className='connect-with-us-container'>
                            <p>connect with us :</p>
                            <button type='button' onClick={onClickChat}>Chat Request</button>
                           
                        </div>}
                    </div>
        </li>

      
    )

}

export default PropertyCard