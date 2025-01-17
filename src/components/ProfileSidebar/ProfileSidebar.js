import  './ProfileSidebar.css'

import { useHistory } from 'react-router-dom';

const ProfileSidebar=()=>{
    
    const history = useHistory();

    const onClickSidebarButton=(event)=>{
        history.push(`/profile/${event.target.name}`);

    }

    return(
        <div className='sidebar-container'>
            <h3>Mange Your Account</h3>
            <hr/>

            <div className='sidebar-buttons-container'>
                <button name='myProfile' onClick={onClickSidebarButton} className='sidebar-button'>Basic Profile</button>
                <button name='myShortlists' onClick={onClickSidebarButton} className='sidebar-button'>Your Shortlists</button>
                <button name='myContacts' onClick={onClickSidebarButton} className='sidebar-button'>Owners you Contacted</button>
                <button name='myPayments' onClick={onClickSidebarButton} className='sidebar-button'>Your Payments</button>
                <button name='myProperties' onClick={onClickSidebarButton} className='sidebar-button'>Your Properties</button>
                <button name='enquiries' onClick={onClickSidebarButton} className='sidebar-button'>Interested in your Properties</button>
            </div>
        </div>
        
    )

}

export default ProfileSidebar