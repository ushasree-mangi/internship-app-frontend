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
                <div className='profile-card'>
                  
                    <h2>{userProfileInfo.username}</h2>
                    <p>{userProfileInfo.email}</p>
                    <p>{userProfileInfo.phoneNumber}</p>
                    <button className='edit-profile-btn'>Edit Details</button>
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
