import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import Header from '../Header'
import  './MyProfile.css'



const MyProfile=()=>{

    return(
        <> <Header/> 
        <div className='my-profile-page-container'>
            <ProfileSidebar/>
             <h1>MY Profile page</h1>

        </div>
        </>
        
    )

}

export default MyProfile