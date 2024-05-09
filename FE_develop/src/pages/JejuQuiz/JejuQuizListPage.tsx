// LevelListPage.tsx

import React from "react";
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import './JejuQuizListPage.css'; // CSS 파일을 임포트합니다.

const LevelListPage: React.FC = () => {
  const levels = Array.from({ length: 10 }, (_, index) => (index + 1).toString());

  return (
    <div className="quiz-list-container">
        <BackButton />
      <div className="level-list-container"> {/* 최상위 요소에 클래스 추가 */}
        <ul className="level-list">
          {levels.map((level) => (
            <li key={level} className="level-item">
              {/* 클래스명을 적용한 링크 */}
              <Link to={`/jeju-quiz/level/${level}`} className="level-link">Level {level}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LevelListPage;
