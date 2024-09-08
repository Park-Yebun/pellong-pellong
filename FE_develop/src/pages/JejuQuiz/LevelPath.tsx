import React, { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Link } from 'react-router-dom';
import useStore from '../../store';
import './LevelPath.css'; // Import the CSS file
import axios from "axios";
import { error } from "console";

const levels = Array.from({ length: 10 }, (_, i) => i + 1);

const LevelPath: React.FC = () => {
  const store = useStore();
  const { showBoundary } = useErrorBoundary();
  const [data, setData] = useState<number | null>(null); // 데이터 상태 추가

  useEffect(() => {
    // store.loginUserInfo?.memberId 값이 변경될 때마다 콘솔에 출력
    // console.log("Member ID:", store.loginUserInfo?.memberId);

    axios.get('https://www.saturituri.com/api/learning/' + store.loginUserInfo?.memberId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      setData(response.data); // 데이터 상태 업데이트
    })
    .catch((error) => {
      showBoundary(error);
    })
  });

  const handleOtherClick = () => {
    // 그 외의 경우에 대한 클릭 이벤트 처리
    alert('이전 챕터의 학습을 완료해주세요!');
  };

  return (
    <div className="level-path-container">
      <div className="level-path-header">가족</div>
      <div className="level-path">
        {levels.map((level, index) => (
          <React.Fragment key={level}>
            {index > 0 && (
              <div className={`stepping-stones stones-${index}`}>
                <div className="stone"></div>
              </div>
            )}
            {/* 조건부 렌더링 */}
            {data && data >= level ? ( // data가 존재하고 data가 level 이상인 경우
              <Link to={`/jeju-quiz/level/${level}`} className={`level-circle level-${level}`}>
                {level}
              </Link>
            ) : ( // 그 외의 경우
              <div className={`level-circle level-${level}`} onClick={handleOtherClick}>
                <div className="level-image">
                  <img src='../../assets/badges/00blind.png' alt="얍얍" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LevelPath;
