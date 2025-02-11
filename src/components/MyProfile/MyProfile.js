import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import {useState ,useEffect} from 'react'
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie'
import  './MyProfile.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

const MyProfile=()=>{

    const [userProfileInfo,setProfileInfo]=useState({})
    
    

    const getProfileData=async()=>{
        try{ 
            const token = Cookies.get('jwt_token')
          
            
              if (token !== undefined) {
                  const url="http://localhost:4000/user-profile"
                  const options = {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    }
                    
              }
              const response = await fetch(url, options)
              const data = await response.json()
              console.log(data)
              const {username,email,phoneNumber}=data 
               setProfileInfo({username,email,phoneNumber})
              
            }        
          }catch (error) {
            console.error(`Error fetching profile data:${error.message}`);
              }
      }
      
        useEffect (()=>{ 
            getProfileData();
        }
    ,[])


    const  renderLoadingView = ({ loading }) => (
        <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#36d7b7" loading={loading} size={50} />
       </div>
      )

      const renderFailureView = (props) => { 

        const {showErrorMsg,errorMsg}=props
    
        return( 
        <div className="products-error-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
            alt="products failure"
            className="products-failure-img"
          />
          <h1 className="product-failure-heading-text">
            Oops! Something Went Wrong
          </h1>
          <p className="products-failure-description">
            We are having some trouble processing your request. Please try again.
          </p>
         {showErrorMsg&&<p>{errorMsg}</p>} 
        </div>
        )
      }
    
    

    return(
       
        <div className='my-profile-page-container'>
            <ProfileSidebar/>
            <div>
             <h1>MY Profile page</h1> 
             <p>User Name: {userProfileInfo.username}</p>
             <p>Email : {userProfileInfo.email}</p>
             <p>Phone Number : {userProfileInfo.phoneNumber}</p>
             </div>

        </div>
     
        
    )

}

export default MyProfile