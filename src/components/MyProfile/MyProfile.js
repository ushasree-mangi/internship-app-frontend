import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import './MyProfile.css';


const MyProfile = () => {
    const [userProfileInfo, setProfileInfo] = useState({});
    const [stats, setStats] = useState({ properties: 0, chatReceived: 0, chatSent: 0 });

    const getProfileData = async () => {
        try {
            const token = Cookies.get('jwt_token');
            if (token) {
                const url = "https://internship-app-backend-production.up.railway.app/user-profile";
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                };
                const response = await fetch(url, options);
                const data = await response.json();
                setProfileInfo({ username: data.username, email: data.email, phoneNumber: data.phoneNumber });
            }
        } catch (error) {
            console.error(`Error fetching profile data: ${error.message}`);
        }
    };

    useEffect(() => {
        getProfileData();
        setStats({ properties: 5, chatReceived: 12, chatSent: 7 }); // Placeholder stats, replace with API data
    }, []);

    return (
        <div className='my-profile-page-container'>
            <ProfileSidebar />
            <div className='my-profile-content'>
                <p>Edit your profile</p>
                <br></br>
                <hr></hr>
                <div className='profile-card'>
                    <div className="myprofile-field">
                        <label className='myprofile-label'>Name</label>
                        <input type='text' className='myprofile-input-box' value={userProfileInfo.username} readOnly />
                    </div>

                    <div className="myprofile-field">
                        <label className='myprofile-label'>Email</label>
                        <input type='email' className='myprofile-input-box' value={userProfileInfo.email} readOnly />
                    </div>

                    <div className="myprofile-field">
                        <label className='myprofile-label'>Phone Number</label>
                        <input type='text' className='myprofile-input-box' value={userProfileInfo.phoneNumber} readOnly />
                    </div>

                    <center>                    
                        <button className='edit-profile-btn'>Save Profile</button>
                    </center>
                </div>

                <div className='profile-stats'>
                    <div className='stat-box'><span>{stats.properties}</span> Properties</div>
                    <div className='stat-box'><span>{stats.chatReceived}</span> Chat Requests Received</div>
                    <div className='stat-box'><span>{stats.chatSent}</span> Chat Requests Sent</div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
