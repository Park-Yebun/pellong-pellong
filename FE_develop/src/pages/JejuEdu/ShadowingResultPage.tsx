import React from 'react';
import { Link } from 'react-router-dom';

const ShadowingResultPage = () => {
  return (
    <div>
      <h1>사투리 쉐도잉 결과 화면</h1>
      <p>사투리 쉐도잉 결과를 보여주는 곳임다</p>
      <div>
        <Link to="/jeju-edu">사투리 배움터</Link>
      </div>
    </div>
  );
};

export default ShadowingResultPage;
