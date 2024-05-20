import React from 'react';
import './UserRank.css'

// 이미지 파일 직접 가져오기
import bronze from '../../assets/bronze.png';
import silver from '../../assets/silver.png';
import gold from '../../assets/gold.png';
import platinum from '../../assets/platinum.png';
import diamond from '../../assets/diamond.png';
import master from '../../assets/master.png';
import grandmaster from '../../assets/grandmaster.png';
import challenger from '../../assets/challenger.png';

interface RankTierProps {
    username: string;
    tier: string;
}

// 티어에 맞는 이미지 매핑
const tierImages: { [key: string]: string } = {
    "Bronze": bronze,
    "Silver": silver,
    "Gold": gold,
    "Platinum": platinum,
    "Diamond": diamond,
    "Master": master,
    "Grandmaster": grandmaster,
    "Challenger": challenger
};

const RankTier: React.FC<RankTierProps> = ({ username, tier }) => {
    const tierImage = tierImages[tier];

    return (
        <div className='rank-user-component'>
            <img src={tierImage} alt={tier} className='tier-img'/>
            <div className='rank-user-info'>
                <div className='rank-user-name'>{username}'s Rank</div>
                <div className='rank-user-tier'>{tier}</div>
            </div>
        </div>
    );
}

export default RankTier;
