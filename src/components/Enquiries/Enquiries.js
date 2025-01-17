import  './Enquiries.css'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import Header from '../Header'

const Enquiries=()=>{

    return(
        <><Header/>
        <div className='enquiries-page-container'>
            <ProfileSidebar/>
            <h1>Enquiries page</h1>
        </div>
        </>
        
    )

}

export default Enquiries