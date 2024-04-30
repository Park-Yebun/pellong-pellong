import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyPage.css'

import UserProfile from '../../components/MyPage/UserProfile';
import UserRank from '../../components/MyPage/UserRank'
import UserBadge from '../../components/MyPage/UserBadge'

const MyPage: React.FC = () => {
  const username = "빵빵이";
  const tier = "Platinum";

  const [badges] = useState([
    { id: 1, title: "First Win", description: "Won your first match.", imageUrl: "../../assets/badges/b1.jpg" },
    { id: 2, title: "Marathoner", description: "Completed a marathon.", imageUrl: "../../assets/badges/b2.jpg" },
    { id: 3, title: "Bookworm", description: "Read 100 books.", imageUrl: "../../assets/badges/b3.jpg" },
    { id: 4, title: "First Win", description: "Won your first match.", imageUrl: "../../assets/badges/b4.jpg" },
    { id: 5, title: "Marathoner", description: "Completed a marathon.", imageUrl: "../../assets/badges/b5.jpg" },
    { id: 6, title: "Bookworm", description: "Read 100 books.", imageUrl: "../../assets/badges/b6.jpg" },
    { id: 7, title: "First Win", description: "Won your first match.", imageUrl: "../../assets/badges/b7.jpg" },
    { id: 8, title: "Marathoner", description: "Completed a marathon.", imageUrl: "../../assets/badges/b8.jpg" },
    // 추가 뱃지 데이터
  ]);

  return (
    <div className='mypage-container'>
      <UserProfile />
      <UserRank username={username} tier={tier} />
      <div className="profile-edit-button">
        <Link to="/edit-profile" className="btn-edit-profile">프로필 수정</Link>
      </div>
      <UserBadge badges={badges} /> 
    </div>
  );
};

export default MyPage;
