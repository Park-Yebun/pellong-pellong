import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import useStore from '../store';
import myPageIcon from '../assets/mypage-icon.png';
import rankIcon from '../assets/rank-icon.png';
import sunsetIcon from '../assets/sunset.png';
import jejuImage from '../assets/jeju.png';
import XButton from '../assets/x_button.png';
import cloudQuiz from '../assets/cloud-quiz.png';
import cloudTest from '../assets/cloud-test.png';
import cloudPlay from '../assets/cloud-play.png';
import cloudEdu from '../assets/cloud-edu.png';

function MainPage() {
  const navigate = useNavigate(); // useNavigate hook 사용
  const store = useStore();

  const [showModal, setShowModal] = useState(false);
  const [nightMode, setNightMode] = useState(false); // 야경 모드 상태

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, path: string) {
    e.preventDefault(); // 기본 링크 동작 차단
    // 애니메이션을 추가할 수 있습니다.
    setTimeout(() => {
      navigate(path); // 설정한 지연 시간 후에 페이지 이동
    }, 300);
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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    const fetchData = async () => {
      if (accessToken) {
        try {
          const response = await fetch('https://www.saturituri.com/api/members/info', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accessToken
            }
          });
          const userInfo = await response.json();
          store.setLoginUserInfo(userInfo)
          console.log("로그인 데이터 저장 완료", userInfo)
        } catch (error) {
          console.log("로그인 데이터 저장 실패", error)
        };
      };
    }
    fetchData();
  }, []);

  return (
    <div className={`main-container ${nightMode ? 'night-mode' : ''}`}>
      <div className="top-right-links">
        <a onClick={toggleNightMode}  className="image-link">
          <img src={sunsetIcon} alt="" />
        </a>
        <a href="/rank" onClick={(e) => handleClick(e, '/rank')} className="image-link">
          <img src={rankIcon} alt="랭크 조회 페이지" />
        </a>
        <a href="/my-page" onClick={(e) => handleClick(e, '/my-page')} className="image-link">
          <img src={myPageIcon} alt="마이페이지" />
        </a>
      </div>
      <div className="jeju-image-container">
        <img src={jejuImage} alt="제주도" className="jeju-image" onClick={toggleModal} />
      </div>
      <div className="quiz-links">
        <a href="/jeju-quiz" onClick={(e) => handleClick(e, '/jeju-quiz')} className="rect-link top-right">
          <img src={cloudQuiz} alt="사투리퀴즈" className="cloud-image"/>
        </a>
        <a href="/jeju-test" onClick={(e) => handleClick(e, '/jeju-test')} className="rect-link top-left">
          <img src={cloudTest} alt="사투리모의고사" className="cloud-image" />
        </a>
        <a href="/jeju-play" onClick={(e) => handleClick(e, '/jeju-play')} className="rect-link bottom-left">
          <img src={cloudPlay} alt="사투리놀이터" className="cloud-image"/>
        </a>
        <a href="/jeju-edu" onClick={(e) => handleClick(e, '/jeju-edu')} className="rect-link bottom-right">
          <img src={cloudEdu} alt="사투리배움터" className="cloud-image" />
        </a>
      </div>
      {showModal && (
        <div className="mainpage-modal-overlay" onClick={handleModalClose}>
          <div className="mainpage-modal">
            <div className="mainpage-close">
              <img src={XButton} alt="" onClick={handleModalClose} />
            </div>
            <div className="mainpage-modal-content">
              <p>일일 퀘스트 정보를 보여주는 내용</p>
              {/* 모달 내용 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;