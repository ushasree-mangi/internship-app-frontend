import  './MyPayments.css'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import Header from '../Header'

const MyPayments=()=>{

    return(
        <> 
        <Header/>
        <div className='my-payments-page-container'>
            <ProfileSidebar/>
            <h1>MyPayments page</h1>
        </div>
        </>
        
    )

}

export default MyPayments