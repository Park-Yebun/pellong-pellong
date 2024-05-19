import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../store';
import './MainPage.css';
import myPageIcon from '../assets/mypage-icon.png';
import rankIcon from '../assets/rank-icon.png';
import sunsetIcon from '../assets/sunset.png';
import jejuImage from '../assets/jeju.png';
import Bang from '../assets/bang.png';
import XButton from '../assets/x_button.png';
import cloudQuiz from '../assets/cloud-quiz.png';
import cloudTest from '../assets/cloud-test.png';
import cloudPlay from '../assets/cloud-play.png';
import cloudEdu from '../assets/cloud-edu.png';
import cloudTrans from '../assets/cloud-trans.png';
import DailyQuote from '../components/MainPage/DailyQuote';


interface DailyQuest {
  dailyQuestId: number;
  dailyExp: number;
  passed: boolean;
  accomplished: boolean;
  shared: boolean;
}

function MainPage() {
  const navigate = useNavigate();
  const store = useStore();

  const [showModal, setShowModal] = useState(false);
  const [nightMode, setNightMode] = useState(false); // 야경 모드 상태
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]); // 일일 퀘스트 목록

  useEffect(() => {
    fetchDailyQuests();
  }, []);

  const fetchDailyQuests = async () => {
    try {
      const response = await axios.get(`https://www.saturituri.com/api/daily-quest/${store.loginUserInfo?.memberId}`);
      const data = response.data;
      setDailyQuests(data);
      console.log("됐다", data)
    } catch (error) {
      console.error('Error fetching daily quests:', error);
    }
  };

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, path: string) {
    e.preventDefault(); // 기본 링크 동작 차단
    if (path.includes('/my-page/') && store.isLogin === false) {
      navigate('/login')
    } else {
      setTimeout(() => {
        navigate(path); // 설정한 지연 시간 후에 페이지 이동
      }, 300);
    };
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleModalClose(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) { // 모달 배경을 클릭했을 때만 닫히도록
      setShowModal(false);
    }
  }

  function toggleNightMode() {
    setNightMode(!nightMode); // 야경 모드 토글
  }

  return (
    <div className={`main-container ${nightMode ? 'night-mode' : ''}`}>
      <DailyQuote />
      <div className="top-right-links">
        <a onClick={toggleNightMode} className="image-link">
          <img src={sunsetIcon} alt="" />
          <div className='top-mini-text'>석양</div>
        </a>
        <a href="/rank" onClick={(e) => handleClick(e, '/rank')} className="image-link">
          <img src={rankIcon} alt="랭크 조회 페이지" />
          <div className='top-mini-text'>랭킹</div>
        </a>
        <a onClick={(e) => handleClick(e, '/my-page/' + store.loginUserInfo?.memberId)} className="image-link" >
          <img src={myPageIcon} alt="마이페이지" />
          <div className='top-mini-text'>마이</div>
        </a>
      </div>

      <div className="jeju-image-container">
        <div
            style={
              {
                top: '6rem',
                position: 'absolute',
                // width: '5rem',
                // height: '4rem',
                // backgroundColor: 'black',
              }
            }
            onClick={toggleModal}
        ><img src={Bang} alt="느낌표"/></div>
        <img src={jejuImage} alt="제주도" className="jeju-image" onClick={toggleModal} />
      </div>
      <div className="quiz-links">
        <a href="/jeju-quiz" onClick={(e) => handleClick(e, '/jeju-quiz')} className="rect-link top-right">
          <img src={cloudQuiz} alt="사투리퀴즈" className="cloud-image" />
        </a>
        <a href="/jeju-test" onClick={(e) => handleClick(e, '/jeju-test')} className="rect-link top-left">
          <img src={cloudTest} alt="사투리모의고사" className="cloud-image" />
        </a>
        <a href="/jeju-play" onClick={(e) => handleClick(e, '/jeju-play')} className="rect-link bottom-left">
          <img src={cloudPlay} alt="사투리놀이터" className="cloud-image" />
        </a>
        <a href="/ai" onClick={(e) => handleClick(e, '/ai')} className="rect-link bottom-right">
          <img src={cloudTrans} alt="사투리번역기" className="cloud-image" />
        </a>
      </div>
      {showModal && (
        <div className="mainpage-modal-overlay" onClick={handleModalClose}>
          <div className="mainpage-modal">
            <div className="mainpage-modal-content">
              <div className='main-quest-container'>
                <div className='main-quest-head'>
                  DAILY QUEST
                  <br />
                  <br />
                  매일의 목표를 달성해보세요
                </div>
              </div>
              <div className='main-quest-box'>
                {dailyQuests.length > 0 ? (
                  dailyQuests.map((quest) => (
                    <div key={quest.dailyQuestId}>
                      <div>일일 경험치: {quest.dailyExp}</div>
                      <div>90점 이상 통과 여부: {quest.passed ? '통과' : '미통과'}</div>
                      <div>일일 퀘스트 완료 여부: {quest.accomplished ? '완료' : '미완료'}</div>
                      <div>사투리 모의고사 공유 여부: {quest.shared ? '공유됨' : '미공유'}</div>
                    </div>
                  ))
                ) : (
                  <div>데이터가 없습니다.</div>
                  // 로딩 중 메시지 대신 데이터 없음 메시지를 표시합니다.
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
