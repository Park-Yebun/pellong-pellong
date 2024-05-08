// RankPage.tsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BackButton from '../../components/BackButton';
import RankIcon from '../../components/RankIcon';
import ranks from '../../data/ranks';

// 랭크 객체의 타입 정의
interface Rank {
  id: number;
  title: string;
  imageUrl: string;
  minExperience: number; // 최소 경험치
  maxExperience: number; // 최대 경험치
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const RankPage: React.FC = () => {
  // 임시 경험치 데이터
  const [experience, setExperience] = useState(1550);

  // 경험치에 따라 현재 랭크 계산
  const currentRank = ranks.find((rank: Rank) => experience >= rank.minExperience && experience <= rank.maxExperience);

  return (
    <div>
      <BackButton />
      <div>랭크 페이지</div>
      <div>현재 경험치: {experience}</div>
      <div>현재 랭크: {currentRank ? currentRank.title : '랭크 없음'}</div>
      <Slider {...settings}>
        {ranks.map((rank, index) => (
          <RankIcon key={index} rank={rank.title} iconUrl={rank.imageUrl} />
        ))}
      </Slider>
    </div>
  );
};

export default RankPage;
