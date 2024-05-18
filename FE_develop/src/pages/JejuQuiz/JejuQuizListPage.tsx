import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import useStore from '../../store';
import BackButton from '../../components/BackButton';
import LevelPath from './LevelPath'; // Import the LevelPath component
import './JejuQuizListPage.css'; // Import the correct CSS file

const LevelListPage: React.FC = () => {
  const store = useStore();

  useEffect(() => {
    // store.loginUserInfo?.memberId 값이 변경될 때마다 콘솔에 출력
    console.log("Member ID:", store.loginUserInfo?.memberId);
  }, [store.loginUserInfo?.memberId]); // 의존성 배열에 store.loginUserInfo?.memberId 추가




  return (
    <div className="quiz-list-container">
      <BackButton />
      <div className="level-list-container"> {/* 최상위 요소에 클래스 추가 */}
        <LevelPath />
      </div>
    </div>
  );
};

export default LevelListPage;
