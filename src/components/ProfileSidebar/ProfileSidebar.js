import './ProfileSidebar.css';
import { useHistory, useLocation } from 'react-router-dom';

const ProfileSidebar = () => {
    const history = useHistory();
    const location = useLocation();

    const onClickSidebarButton = (event) => {
        history.push(`/profile/${event.target.name}`);
    };

    return (
        <div className="sidebar-container">
            <div>
                <p className='manage-acccount-paragraph'>Manage your account</p>
                <hr />
            </div>
            <div className="sidebar-buttons-container">
                <button
                    name="myProfile"
                    onClick={onClickSidebarButton}
                    className={`sidebar-button ${location.pathname.includes('/profile/myProfile') ? 'active' : ''}`}>Basic Profile</button>
                <button
                    name="myShortlists"
                    onClick={onClickSidebarButton}
                    className={`sidebar-button ${location.pathname.includes('/profile/myShortlists') ? 'active' : ''}`}>Your Shortlists</button>
                <button
                    name="myContacts"
                    onClick={onClickSidebarButton}
                    className={`sidebar-button ${location.pathname.includes('/profile/myContacts') ? 'active' : ''}`}>Owners you Contacted</button>
                <button
                    name="myPayments"
                    onClick={onClickSidebarButton}
                    className={`sidebar-button ${location.pathname.includes('/profile/myPayments') ? 'active' : ''}`}>Your Payments</button>
                <button
                    name="myProperties"
                    onClick={onClickSidebarButton}
                    className={`sidebar-button ${location.pathname.includes('/profile/myProperties') ? 'active' : ''}`}>Your Properties</button>
                <button
                    name="interestedProperties"
                    onClick={onClickSidebarButton}
                    className={`sidebar-button ${location.pathname.includes('/profile/interestedProperties') ? 'active' : ''}`}>Interested in your Properties</button>
            </div>
        </div>
    );
};

export default ProfileSidebar;
