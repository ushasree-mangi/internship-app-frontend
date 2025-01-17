import  './MyProperties.css'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import Header from '../Header'
import PropertyCard  from '../PropertyItem'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const MyProperties=()=>{


    const [propertiesArray,setPropertiesArray]=useState([])

    useEffect(()=>{
        const getProperties=async()=>{
            const token = Cookies.get('jwt_token')
            console.log(`inside the home ${token}`)
            const url="http://localhost:4000/properties/owner"  
            const headers= {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                }
            
            const response = await axios.get(url,{headers});
            
           console.log(response.data)
            setPropertiesArray(response.data)
        }


    getProperties();

    },[])
    

    return(
        <> <Header/> 
        <div className='my-properties-page-container'>
            <ProfileSidebar/>
            <div className='my-properties-page-content-container'>
            <h1>MY Properties page</h1>
            <div className="property-list">
                    <h2 className="properties-heading">Properties</h2>
                    <ul className="property-card-list">
                        {propertiesArray.length===0?<p>No Properties</p>:propertiesArray.map((eachItem)=>{
                
                    return <PropertyCard key={eachItem.propertyId} propertyDetails={eachItem}/>
                })}
                    </ul>
            </div>
            </div>
        </div>
        </>
        
    )

}

export default MyProperties