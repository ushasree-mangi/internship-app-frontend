import './MyProperties.css'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import PropertyCard from '../PropertyItem/PropertyItem'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import image from '../../assets/images/no-properties.svg'

const MyProperties = () => {


    const [propertiesArray, setPropertiesArray] = useState([])

    useEffect(() => {
        const getProperties = async () => {
            const token = Cookies.get('jwt_token')
            console.log(`inside the home ${token}`)
            const url = "https://internship-app-backend-production.up.railway.app/properties/owner"
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }

            const response = await axios.get(url, { headers });

            console.log(response.data)
            setPropertiesArray(response.data)
        }


        getProperties();

    }, [])


    return (
       
            <div className='my-properties-page-container'>
                <ProfileSidebar />
                <div className='my-properties-page-content-container'>
                    <div className='my-contacts-header-buttons'>
                        <button>All</button>
                        <button>Rent</button>
                        <button>Sale</button>
                        <button>Commercial-Rent</button>
                        <button>Commercial-Sale</button>
                        <button>PG/Hostel</button>
                        <button>Flatemates</button>
                        <button>Land/Plot</button>
                    </div>
            <div className="property-list">
                    <h2 className="properties-heading">Properties</h2>
                    <ul className="property-card-list">
                        {propertiesArray.length===0? <div className='properties-page'>
                        <center>
                            <img src={image}></img>
                            <h4>No Properties Posted</h4>
                            <p>Want to Post A Property Now?</p>
                            <button className='myproperties-message-btn'> &nbsp;Post Now</button>
                        </center>
                    </div>:propertiesArray.map((eachItem)=>{
                
                    return <PropertyCard key={eachItem.propertyId} propertyDetails={eachItem}/>
                })}
                    </ul>
            </div>
            <br></br>
            <br></br>
                    {/* <div className='properties-page'>
                        <center>
                            <img src={image}></img>
                            <h6>No Properties Posted</h6>
                            <p>Want to Post A Property Now?</p>
                            <button className='send-message-btn'> &nbsp;Post Now</button>
                        </center>
                    </div> */}
                </div>

            </div>

       

    )

}

export default MyProperties