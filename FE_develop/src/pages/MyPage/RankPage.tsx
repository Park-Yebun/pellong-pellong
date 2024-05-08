// RankPage.tsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BackButton from '../../components/BackButton';
import RankIcon from '../../components/RankIcon';
import ranks from '../../data/ranks';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const RankPage: React.FC = () => {
  return (
    <div>
      <BackButton />
      <div>랭크 페이지</div>
      <Slider {...settings}>
        {ranks.map((rank, index) => (
          <RankIcon key={index} rank={rank.title} iconUrl={rank.imageUrl} />
        ))}
      </Slider>
    </div>
  );
};

export default RankPage;
