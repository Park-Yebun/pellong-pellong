import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton'

const ShadowingMainPage = () => {
  return (
    <div>
      <BackButton />
      <h1>사투리 배움터</h1>
      <p>사투리 쉐도잉 페이지이여요</p>
      <div>
        <Link to="/jeju-edu/play-page">쉐도잉 플레이</Link>
      </div>
    </div>
  );
};

export default ShadowingMainPage;
