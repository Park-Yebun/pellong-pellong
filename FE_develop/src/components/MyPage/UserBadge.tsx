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

const BadgeComponent: React.FC<{ badge: Badge; onClick: (badge: Badge) => void }> = ({ badge, onClick }) => {
  return (
    <div className="badge" onClick={() => onClick(badge)}>
      <img src={badge.imageUrl} alt={badge.title} />
    </div>
  );
};

const UserBadge: React.FC<UserBadgeProps> = ({ badges }) => {
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
        </div>
      )}
    </div>
  );
};

export default UserBadge;
