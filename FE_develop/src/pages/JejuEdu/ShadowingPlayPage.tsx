import React from 'react';
import { Link } from 'react-router-dom';

const ShadowingPlayPage = () => {
  return (
    <div>
      <h1>사투리 쉐도잉 플레이 화면</h1>
      <p>여기가 사투리 쉐도잉 실행하는 곳</p>
      <div>
        <Link to="/jeju-edu/result">쉐도잉 결과</Link>
      </div>
    </div>
  );
};

export default ShadowingPlayPage;
