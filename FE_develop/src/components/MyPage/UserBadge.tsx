import React, { useState } from 'react';
import './UserBadge.css';
import useStore from '../../store';

interface Badge {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isAcquired: boolean; // acquired 속성 추가
}

interface UserBadgeProps {
  badges: Badge[];
}

const BadgeComponent: React.FC<{ badge: Badge; onClick: (badge: Badge) => void; isAcquired: boolean }> = ({ badge, onClick, isAcquired}) => {
  return (
    <div className="badge" onClick={() => onClick(badge)}>
        <img src={isAcquired ? badge.imageUrl : '../../assets/badges/00blind.png'} alt={badge.title} />
      {/* <img src={badge.imageUrl} alt={badge.title} /> */}
    </div>
  );
};

const updateRepresentativeBadge = async (memberId: number, badgeId: number) => {
  try {
    const response = await fetch(`https://www.saturituri.com/api/profiles/${memberId}/badges/${badgeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Representative badge updated successfully', data);
  } catch (error) {
    console.error('Error updating representative badge:', error);
  }
};

const UserBadge: React.FC<UserBadgeProps> = ({ badges }) => {
  const store = useStore();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null); // 초기 상태 타입 지정

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
  };


  return (
    <div>
      <div className="badge-grid">
        {badges.map(badge => (
          <BadgeComponent 
            key={badge.id} 
            badge={badge} 
            onClick={handleBadgeClick}
            isAcquired={badge.isAcquired} />
        ))}
      </div>
      {selectedBadge && (
        <div className="badge-description">
          <h2>{selectedBadge.title}</h2>
          <p>{selectedBadge.description}</p>
          <button onClick={() => setSelectedBadge(null)}>Close</button>
          {/* isAcquired 값이 true인 경우에만 대표 뱃지로 변경 버튼을 보여줍니다. */}
          {selectedBadge.isAcquired && (
            <button onClick={() => updateRepresentativeBadge(store.loginUserInfo?.memberId ?? 0, selectedBadge.id)}>대표 뱃지로 변경</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserBadge;
