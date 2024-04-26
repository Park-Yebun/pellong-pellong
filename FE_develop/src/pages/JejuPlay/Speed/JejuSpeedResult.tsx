import React from 'react';
import { Link } from 'react-router-dom';

const JejuSpeedResult = () => {
  return (
    <div>
      <h1>스피드 퀴즈 결과 페이지</h1>
      <p>스피드 퀴즈 끝까지 다 풀었으면 이쪽으로 오게됨.</p>
      <div>
        <Link to="/speed">스피드 퀴즈 시작 페이지로 돌아가기</Link>
      </div>
    </div>
  );
};

export default JejuSpeedResult;
