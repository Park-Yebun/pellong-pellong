import React from "react"
import './UserProfile.css'
import ChickenRider from '../../assets/chicken-rider.png'

interface JwtPayload {
    sub: string;
    name: string;
    email: string;
    memberId: string;
    nickname: string;
    profileImg: string;
  }

interface Props {
    decodedToken: JwtPayload | null;
  }

const UserProfile: React.FC<Props> = ({ decodedToken }) => {
    if (!decodedToken) {
        return <div>Loading or no access token available...</div>;
      }


    return (
        <div>
            <div className="user-profile">
                <div className="user-profile-container">
                    <div className="user-photo-container">
                        <img src={ChickenRider} alt="User" className="user-photo" />
                    </div>
                    <div>
                        <img src={decodedToken.profileImg} alt="Profile" style={{ width: 100, borderRadius: '50%' }} />
                        <p>Member ID: {decodedToken.memberId}</p>
                        <p>Name: {decodedToken.name}</p>
                        <p>Email: {decodedToken.email}</p>
                        <p>Nickname: {decodedToken.nickname}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile