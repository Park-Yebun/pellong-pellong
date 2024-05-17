// RankPage.tsx
import React, { useState, useEffect } from 'react';
import './RankPage.css';

import BackButton from '../../components/BackButton';

interface User {
  memberId: number;
  nickname: string;
  sumExp: number;
  profileImg: string;
  // rankBadge: string;
  rankId: number;
}


  const sortAndRankUsers = (users: User[]): User[] => {
    const sortedUsers = users.sort((a, b) => b.sumExp - a.sumExp);
    let rank = 1;
    let prevExperience = sortedUsers[0].sumExp;
  
    console.log("=== 랭크 부여 과정 ===");
    console.log("랭크\t아이디\t유저네임\t경험치");
    
    const rankedUsers = sortedUsers.map((user, index) => {
      if (index > 0 && user.sumExp !== prevExperience) {
        rank++;
      }
      console.log(`${rank}\t${user.memberId}\t${user.nickname}\t${user.sumExp}`);
      prevExperience = user.sumExp;
      return { ...user, rank };
    });
  
    return rankedUsers;
  };
  
  const UserRanking: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
  
    useEffect(() => {
      console.log("페치데이터 동작!!")
      const fetchUsers = async () => {
        try {
          const response = await fetch('https://www.saturituri.com/api/ranking', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data: User[] = await response.json();
          const rankedUsers = sortAndRankUsers(data);
          setUsers(rankedUsers);
          console.log("데이터 로드 완료", data);
        } catch (error) {
          console.log("데이터 로드 실패", error)
        }
      }
      fetchUsers();
    }, []);
  
    return (
      <div className="user-ranking-container">
        <BackButton />
        <div className='ranking-title'>랭킹 조회</div>
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.memberId} className="user-card">
              <div className="user-info">
                <span className="rank-number">{user.rankId}</span>
                <span className="rank-badge">
                  {/* <img src={user.rankBadge} alt="" /> */}
                </span>
                <img className="profile-picture" src={user.profileImg} alt={`Profile of ${user.nickname}`} />
                <p className="username">{user.nickname}</p>
                <p className="experience">{user.sumExp}xp</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default UserRanking;
