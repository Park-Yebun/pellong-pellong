import React from 'react';
import { Link } from 'react-router-dom';

const JejuSpeedPlay = () => {
  return (
    <div>
      <h1>스피드 퀴즈 플레이 화면</h1>
      <p>여기에서 스피드 퀴즈 풀기</p>
      <div>
        <Link to="/speed/lose-page">스피드 퀴즈 탈락</Link><br />
        <Link to="/speed/result">스피드 퀴즈 완료</Link>
      </div>
    </div>
  );
};

export default JejuSpeedPlay;
