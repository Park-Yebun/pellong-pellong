import React from 'react';
import { Link } from 'react-router-dom';

const JejuSpeedReady = () => {
  return (
    <div>
      <h1>스피드 퀴즈 시작 페이지</h1>
      <p>스피드 퀴즈 시작 및 리스트 불러오는 페이지</p>
      <div>
        <Link to="/speed/play-page">스피드 퀴즈 플레이</Link>
      </div>
    </div>
  );
};

export default JejuSpeedReady;
