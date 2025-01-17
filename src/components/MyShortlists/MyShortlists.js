import  './MyShortlists.css'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import Header from '../Header'

const MyShortlists=()=>{

    return(
        <> <Header/> 
        <div className='my-shortlists-page-container'>
            <ProfileSidebar/>
            <h1>MyShortlists page</h1>
        </div>
        </>
        
    )

}

export default MyShortlists