import React, { useEffect, useState } from "react";
import BackButton from '../../components/BackButton';
import LevelPath from './LevelPath'; // Import the LevelPath component
import './JejuQuizListPage.css'; // Import the correct CSS file

const LevelListPage: React.FC = () => {



  return (
    <div className="quiz-list-container">
      <BackButton />
      <div className="level-list-container"> {/* 최상위 요소에 클래스 추가 */}
        <LevelPath/>
      </div>
    </div>
  );
};

export default LevelListPage;
