import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useStore from '../../store';
import './LevelPath.css'; // Import the CSS file

const levels = Array.from({ length: 10 }, (_, i) => i + 1);

const LevelPath: React.FC = () => {
  const store = useStore();
  const [data, setData] = useState<number | null>(null); // 데이터 상태 추가

  useEffect(() => {
    // store.loginUserInfo?.memberId 값이 변경될 때마다 콘솔에 출력
    console.log("Member ID:", store.loginUserInfo?.memberId);

    const fetchData = async () => {
      try {
        const response = await fetch('https://www.saturituri.com/api/learning/' + store.loginUserInfo?.memberId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        // 데이터에 숫자 잘들어옴
        console.log('데이터', data);
        setData(data); // 데이터 상태 업데이트
      } catch (error) {
        console.log("데이터 로드 실패", error)
      }
    }
    fetchData();
  })

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
              <div className={`level-circle level-${level}`}>
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
