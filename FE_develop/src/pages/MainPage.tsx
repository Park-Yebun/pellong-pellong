import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <div>
        <div>
          <Link to="/my-page">마이페이지</Link>
        </div>
        <div>
          <Link to="/rank">랭크 조회 페이지</Link>
        </div>
        <div>
          <Link to="/jeju-quiz">사투리 퀴즈</Link>
        </div>
        <div>
          <Link to="/jeju-test">사투리 모의고사</Link>
        </div>
        <div>
          <Link to="/jeju-edu">사투리 배움터</Link>
        </div>
        <div>
          <Link to="/jeju-play">사투리 놀이터</Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
