import React from "react"
import './UserProfile.css'

import ChickenRider from '../../assets/chicken-rider.png'

const UserProfile = () => {
    return (
        <div>
            <div className="user-profile">
                <div className="user-profile-container">
                    <div className="user-photo-container">
                        <img src={ChickenRider} alt="User" className="user-photo" />
                    </div>
                    <div className="user-info">
                        <h3>김싸피</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile