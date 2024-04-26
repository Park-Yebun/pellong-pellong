import React from 'react';
import { Link } from 'react-router-dom';

const PlayMainPage = () => {
  return (
    <div>
      <h1>사투리 놀이터</h1>
      <p>여기에서 스피드 퀴즈, 드라마, 대사로 나눠져 진입 가능합니다</p>
      <div>
        <Link to="/speed">스피드 퀴즈</Link>
      </div>
      <div>
        <Link to="/drama">대사 퀴즈</Link>
      </div>
      <div>
        <Link to="/music">음악 퀴즈</Link>
      </div>
    </div>
  );
};

export default PlayMainPage;
