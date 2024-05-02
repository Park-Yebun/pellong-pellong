// components/RankIcon.tsx
import React from 'react';
import './RankIcon.css'; // CSS 파일 임포트

interface RankIconProps {
  rank: string;
  iconUrl: string;
}

const RankIcon: React.FC<RankIconProps> = ({ rank, iconUrl }) => {
  return (
    <div className="rank-icon-container">
      <img src={iconUrl} alt={`랭크 ${rank} 아이콘`} className="rank-icon" />
      <p className="rank-text">{rank}</p>
    </div>
  );
};

export default RankIcon;
