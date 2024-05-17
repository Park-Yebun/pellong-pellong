import React, { useState } from 'react';
import './UserBadge.css';
import useStore from '../../store';

interface Badge {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface UserBadgeProps {
  badges: Badge[];
}

const BadgeComponent: React.FC<{ badge: Badge; onClick: (badge: Badge) => void }> = ({ badge, onClick}) => {
  return (
    <div className="badge" onClick={() => onClick(badge)}>
        {/* <img src={isAcquired ? badge.imageUrl : 'blind.jpg'} alt={badge.title} /> */}
      <img src={badge.imageUrl} alt={badge.title} />
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
          <BadgeComponent key={badge.id} badge={badge} onClick={handleBadgeClick} />
        ))}
      </div>
      {selectedBadge && (
        <div className="badge-description">
          <h2>{selectedBadge.title}</h2>
          <p>{selectedBadge.description}</p>
          <button onClick={() => setSelectedBadge(null)}>Close</button>
          <button onClick={() => updateRepresentativeBadge(store.loginUserInfo?.memberId ?? 0, selectedBadge.id)}>대표 뱃지로 변경</button>
          
        </div>
      )}
    </div>
  );
};

export default UserBadge;
