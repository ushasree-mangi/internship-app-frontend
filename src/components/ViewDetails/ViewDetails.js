import {useState ,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './ViewDetails.css'

const ViewDetails=(props)=>{

    const [propertyDetails,setPropertyDetails]=useState({})
    const {location}=props 
    
    const params = new URLSearchParams(location.search)
    const propertyId = params.get('propertyId');

   
    const getPropertyDetails=async()=>{
            try{ 
                    const token = Cookies.get('jwt_token')
                    console.log(`token in view details ${token}`)
                    console.log(propertyId)

                      if (token !== undefined) {
                        
                            const url=`https://gts-rental-app.onrender.com/property-details?propertyId=${propertyId}`
                            
                         
                            const headers= {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`,
                            
                            
                            }
                           
                            console.log("view details api call made")
                            const response = await axios.get(url, {headers})
                           

                             const propertyDetails =  response.data
                    
                            setPropertyDetails(propertyDetails)
                            
                        }        
            }
            catch (error) {
                    console.error(`Error fetching View Details:${error.errorMsg}`);
            }

    }

    useEffect( ()=>{
        getPropertyDetails()

    } ,[])

    return (
        <div>
            <h1>This is an view details page</h1>
            <img className='view-details-page-property-img' alt={`property image`} src={propertyDetails.imgUrl}/>
            <p>Property Title : {propertyDetails.propertyTitle}</p>
            <p>Property Price :{propertyDetails.price}</p>
            <p>Property description :{propertyDetails.description}</p>
            <p>Property type : {propertyDetails.propertyType}</p>
            <p>Property location :{propertyDetails.location}</p>
            <p></p>
        </div>

    )

}
export default ViewDetails