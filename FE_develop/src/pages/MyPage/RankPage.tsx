// RankPage.tsx
import React, { useState, useEffect } from 'react';
import './RankPage.css';

import BackButton from '../../components/BackButton';

interface User {
  id: number;
  username: string;
  experience: number;
  profilePicture: string;
  rankBadge: string;
  rank: number;
}

const mockUsers: User[] = [
    { id: 1, username: '예부리', experience: 100, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/small.png', rank: 0 },
    { id: 2, username: '감수꽝', experience: 200, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/middle.png', rank: 0 }, 
    { id: 3, username: '김감귤', experience: 300, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/big.png', rank: 0 }, 
    { id: 4, username: '개성주악', experience: 400, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/sobig.png', rank: 0 },
    { id: 5, username: '슈슈슉', experience: 500, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/brilliant.png', rank: 0 }, 
    { id: 6, username: 'eee', experience: 420, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/small.png', rank: 0 },
    { id: 7, username: 'ddd', experience: 250, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/middle.png', rank: 0 },
    { id: 8, username: 'vvv', experience: 370, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/big.png', rank: 0 },
    { id: 9, username: 'bbb', experience: 480, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/sobig.png', rank: 0 }, 
    { id: 10, username: 'aaa', experience: 550, profilePicture:'../../assets/badge/small.png', rankBadge: '../../assets/badge/brilliant.png', rank: 0 },
  ];

  const sortAndRankUsers = (users: User[]): User[] => {
    const sortedUsers = users.sort((a, b) => b.experience - a.experience);
    let rank = 1;
    let prevExperience = sortedUsers[0].experience;
  
    console.log("=== 랭크 부여 과정 ===");
    console.log("랭크\t아이디\t유저네임\t경험치");
    
    const rankedUsers = sortedUsers.map((user, index) => {
      if (index > 0 && user.experience !== prevExperience) {
        rank++;
      }
      console.log(`${rank}\t${user.id}\t${user.username}\t${user.experience}`);
      prevExperience = user.experience;
      return { ...user, rank };
    });
  
    return rankedUsers;
  };
  
  const UserRanking: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
  
    useEffect(() => {
      const rankedUsers = sortAndRankUsers(mockUsers);
      setUsers(rankedUsers);
    }, []);
  
    return (
      <div className="user-ranking-container">
        <BackButton />
        <div className='ranking-title'>랭킹 조회</div>
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <span className="rank-number">{user.rank}</span>
                <span className="rank-badge">
                  <img src={user.rankBadge} alt="" />
                </span>
                <img className="profile-picture" src={user.profilePicture} alt={`Profile of ${user.username}`} />
                <p className="username">{user.username}</p>
                <p className="experience">{user.experience}xp</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default UserRanking;
