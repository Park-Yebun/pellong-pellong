import React, { useState } from 'react';
import './UserBadge.css';
import useStore from '../../store';
import { useErrorBoundary } from "react-error-boundary";
import axios from 'axios';

interface Badge {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isAcquired: boolean;
  isRepresentative?: boolean; // 선택적으로 변경
}

interface UserBadgeProps {
  badges: Badge[];
}

const BadgeComponent: React.FC<{ badge: Badge; onClick: (badge: Badge) => void; isAcquired: boolean; isRepresentative: boolean }> = ({ badge, onClick, isAcquired, isRepresentative }) => {
  return (
    <div className={`badge ${isRepresentative ? 'representative' : ''}`} onClick={() => onClick(badge)}>
      <img src={isAcquired ? badge.imageUrl : '../../assets/badges/00blind.png'} alt={badge.title} />
    </div>
  );
};

const UserBadge: React.FC<UserBadgeProps> = ({ badges }) => {
  const store = useStore();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [updatedBadges, setUpdatedBadges] = useState<Badge[]>(badges.map(badge => ({ ...badge, isRepresentative: badge.isRepresentative ?? false })));
  const { showBoundary } = useErrorBoundary();


  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    // console.log('Selected Badge:', badge);
  };

  const updateRepresentativeBadge = async (memberId: number, badgeId: number) => {
    axios.patch(`http://localhost:8080/profiles/${memberId}/badges/${badgeId}`,
      {
        isRepresentative: true,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      showBoundary(error);
    })
  };

  const handleSetRepresentativeBadge = async () => {
    if (selectedBadge) {
      await updateRepresentativeBadge(store.loginUserInfo?.memberId ?? 0, selectedBadge.id);
      const newBadges = updatedBadges.map(badge =>
        badge.id === selectedBadge.id ? { ...badge, isRepresentative: true } : { ...badge, isRepresentative: false }
      );
      setUpdatedBadges(newBadges);
      setSelectedBadge(null); // 선택된 배지를 초기화합니다.
    }
  };

  return (
    <div>
      <div className="badge-grid">
        {updatedBadges.map(badge => (
          <BadgeComponent 
            key={badge.id} 
            badge={badge} 
            onClick={handleBadgeClick}
            isAcquired={badge.isAcquired}
            isRepresentative={badge.isRepresentative ?? false} // undefined를 false로 처리
          />
        ))}
      </div>
      {selectedBadge && (
        <div className="badge-description">
          <h2>{selectedBadge.title}</h2>
          <p>{selectedBadge.description}</p>
          <button onClick={() => setSelectedBadge(null)}>닫기</button>
          {selectedBadge.isAcquired && (
            <button onClick={handleSetRepresentativeBadge}>대표 뱃지로 변경</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserBadge;
