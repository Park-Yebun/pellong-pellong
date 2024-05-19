import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import './MainPage.css';
import myPageIcon from '../assets/mypage-icon.png';
import rankIcon from '../assets/rank-icon.png';
import sunsetIcon from '../assets/sunset.png';
import jejuImage from '../assets/jeju.png';
import XButton from '../assets/x_button.png';
import cloudQuiz from '../assets/cloud-quiz.png';
import cloudTest from '../assets/cloud-test.png';
import cloudPlay from '../assets/cloud-play.png';
import cloudEdu from '../assets/cloud-edu.png';
import cloudTrans from '../assets/cloud-trans.png';

function MainPage() {
  const navigate = useNavigate(); // useNavigate hook 사용
  const store = useStore();

  const [showModal, setShowModal] = useState(false);
  const [nightMode, setNightMode] = useState(false); // 야경 모드 상태

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, path: string) {
    e.preventDefault(); // 기본 링크 동작 차단
    // 애니메이션을 추가할 수 있습니다.
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
      <div className="top-right-links">
        <a onClick={toggleNightMode}  className="image-link">
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
        <a href="/ai" onClick={(e) => handleClick(e, '/ai')} className="rect-link bottom-right">
          <img src={cloudTrans} alt="사투리번역기" className="cloud-image" />
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
