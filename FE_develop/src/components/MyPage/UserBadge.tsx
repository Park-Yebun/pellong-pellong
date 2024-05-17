import React, { useState } from 'react';
import './UserBadge.css';

interface Badge {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface UserBadgeProps {
  badges: Badge[];
}

const BadgeComponent: React.FC<{ badge: Badge; onClick: (badge: Badge) => void; isRepresentative: boolean }> = ({ badge, onClick, isRepresentative }) => {
  return (
    <div className={`badge ${isRepresentative ? 'representative' : ''}`} onClick={() => onClick(badge)}>
      <img src={badge.imageUrl} alt={badge.title} />
      {isRepresentative && <div className="checkmark">✔</div>} {/* 체크 표시 추가 */}
    </div>
  );
};

const UserBadge: React.FC<UserBadgeProps> = ({ badges }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [representativeBadgeId, setRepresentativeBadgeId] = useState<number | null>(null); // 대표 뱃지 상태 추가

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge); // 배지 설명을 표시하기 위해 클릭한 배지를 선택
  };

  const setRepresentativeBadge = () => {
    if (selectedBadge) {
      setRepresentativeBadgeId(selectedBadge.id); // 선택된 배지를 대표 뱃지로 설정
    }
  };

  return (
    <div>
      <div className="badge-grid">
        {badges.map(badge => (
          <BadgeComponent key={badge.id} badge={badge} onClick={handleBadgeClick} isRepresentative={badge.id === representativeBadgeId} />
        ))}
      </div>
      {selectedBadge && (
        <div className="badge-description">
          <h2>{selectedBadge.title}</h2>
          <p>{selectedBadge.description}</p>
          <button className="set-representative-button" onClick={setRepresentativeBadge}>
            대표 뱃지로 설정
          </button>
          <button onClick={() => setSelectedBadge(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserBadge;
