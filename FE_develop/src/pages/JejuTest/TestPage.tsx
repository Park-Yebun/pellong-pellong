import React, { useEffect, useState } from 'react';
import useStore from '../../store';
import { Link, useNavigate } from 'react-router-dom'; // Link 컴포넌트를 import 합니다.
import { useErrorBoundary } from "react-error-boundary";
import './TestPage.css'; // CSS 파일을 import 합니다.
import axios from 'axios';
import { error } from 'console';

declare global {
  interface Window {
    Kakao: any;
  }
}
const { Kakao } = window;


interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

const QuizApp: React.FC = () => {
  const { showBoundary } = useErrorBoundary();
  const store = useStore();
  const questions: Question[] = [
    {
      id: 1,
      question: "'할망'",
      options: ['망치', '하고싶은 마음', '할머니', '의심되는 마음'],
      correctAnswerIndex: 2,
    },
    {
      id: 2,
      question: "'무신'",
      options: ['뭔, 무슨', '군인', '미신', '맨발'],
      correctAnswerIndex: 0,
    },
    {
      id: 3,
      question: "'히어뜩이'",
      options: ['당당하게', '새 부리', '오뚝이', '정신이 어지럽게'],
      correctAnswerIndex: 3,
    },
    {
      id: 4,
      question: "'페삭'",
      options: ['바삭', '쓰레기', '뱃 삯', '거름망'],
      correctAnswerIndex: 0,
    },
    {
      id: 5,
      question: "'하영'",
      options: ['내려가다', '안녕하세요', '많이', '달 밤'],
      correctAnswerIndex: 2,
    },
    {
      id: 6,
      question: "'천성'",
      options: ['역시', '찬성', '성직자', '언제나'],
      correctAnswerIndex: 3,
    },
    {
      id: 7,
      question: "'졸바로'",
      options: ['줄 서서', '저녁밥', '올바르게', '잠깐 졸다'],
      correctAnswerIndex: 2,
    },
    {
      id: 8,
      question: "'제나'",
      options: ['제발', '그녀', '다리미', '놋쇠'],
      correctAnswerIndex: 0,
    },
    {
      id: 9,
      question: "'오고생이'",
      options: ['자동차', '아침밥', '고스란히', '하루살이'],
      correctAnswerIndex: 2,
    },
    {
      id: 10,
      question: "'역부로'",
      options: ['어이없이', '힘들게', '기차역', '일부러'],
      correctAnswerIndex: 3,
    },
    {
      id: 11,
      question: "'어떠난'",
      options: ['어떻게 하면', '어째서', '어떠한', '얼른'],
      correctAnswerIndex: 1,
    },
    {
      id: 12,
      question: "'더레이'",
      options: ['더해서', '더럽게', '더워지다', '더디다'],
      correctAnswerIndex: 1,
    },
    {
      id: 13,
      question: "'다못'",
      options: ['다다르다', '사뭇', '다만, 또', '대강대강, 대충대충'],
      correctAnswerIndex: 2,
    },
    {
      id: 14,
      question: "'겡삭겡삭'",
      options: ['빙긋빙긋', '싱긋싱긋', '방긋방긋', '쉬엄쉬엄'],
      correctAnswerIndex: 0,
    },
    {
      id: 15,
      question: "'지접다'",
      options: ['아프다', '뜨겁다', '맵다', '지저귀다'],
      correctAnswerIndex: 1,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isReviewingWrongAnswers, setIsReviewingWrongAnswers] = useState<boolean>(false);
  const [wrongAnswersIndices, setWrongAnswersIndices] = useState<number[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [isUserNameSubmitted, setIsUserNameSubmitted] = useState<boolean>(false);


  useEffect(() => {
    // Kakao 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const handleAnswerSelection = (selectedOptionIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    } else {
      if (!isReviewingWrongAnswers) {
        setWrongAnswersIndices([...wrongAnswersIndices, currentQuestionIndex]);
      }
    }
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRetryWrongAnswers = () => {
    setCurrentQuestionIndex(wrongAnswersIndices[0]);
    setScore(0);
    setShowResult(false);
    setIsReviewingWrongAnswers(true);
  };

  // 공유하기 함수
  const handleShare = async () => {
    // 공유 로직 추가
    // console.log("공유하기 버튼이 클릭되었습니다!");

    if(!Kakao.isInitialized()){
      Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }

    try{
        // 공유할 이미지, 추후 합의 필요
        const shareImage = '/@/icons/apple-touch-icon-152x152.png'

        let grade; // 사투리 모의고사 등급 결정
        if (score <= 1) {
          grade = 9;
        } else if (score <= 2) {
          grade = 8;
        } else if (score <= 3) {
          grade = 7;
        } else if (score <= 4) {
          grade = 6;
        } else if (score <= 6) {
          grade = 5;
        } else if (score <= 8) {
          grade = 4;
        } else if (score <= 10) {
          grade = 3;
        } else if (score <= 12) {
          grade = 2;
        } else if (score <= 15) {
          grade = 1;
        } //

        const currentDate = new Date(); // 현재 날짜 및 시간 정보를 가져옵니다.
        // 년, 월, 일, 시, 분, 초를 가져와서 숫자로 변환합니다.
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더하고, 두 자리로 만듭니다.
        const day = currentDate.getDate();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const second = currentDate.getSeconds();

        // 년월일시분초를 합쳐서 하나의 숫자로 만듭니다.
        const testnum = parseInt(`${year}${month}${day}${hour}${minute}${second}`);

        // console.log(testnum); // testnum에 저장된 숫자를 출력합니다.

        const fetchData = async () => {
          axios.patch('https://www.saturituri.com/api/exp/test-sharing/' + store.loginUserInfo?.memberId, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            console.log('성공', response.data);
          })
          .catch((error) => {
            showBoundary(error);
            // console.log("실패", error)
          })
        }
        fetchData();

        const shareTitle = grade + '등급'
        const shareDes = '팰롱팰롱으로 알아보는 나의 제주어 실력!'
        const shareURL = `https://www.saturituri.com/jeju-test/test-result/${score}/${testnum}/${name}`;

        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: shareTitle,
            description: shareDes,
            imageUrl: shareImage, 
            link: {
              mobileWebUrl: shareURL,
              webUrl: shareURL,
            },
          },
          buttons: [
            {
              title: '나도 테스트하기',
              link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL,
              },
            },
          ]
        });
    } catch (error) {
      showBoundary(error);
      // console.log(error);
    }

  };

  const renderQuiz = () => {
    return (
      <div className='test-question-container'>
        <h2 className="test-question">문제 {currentQuestionIndex + 1}</h2>
        <p className="test-question">{questions[currentQuestionIndex].question}</p>
        <ul className="test-options-list">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <li key={index} className="test-option" onClick={() => handleAnswerSelection(index)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUserNameSubmitted(true);
  };

  const renderNameInput = () => {
    return (
      <div className="tt-name-input-container">
        <h2>이름을 입력하세요</h2>
        <form className='formTag' onSubmit={handleNameSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='tt-name-input'
          />
          <button type="submit" className="tt-name-submit-button">확인</button>
        </form>
      </div>
    );
  };

  return (
    <div className="test-container">
      {!isUserNameSubmitted ? (
        renderNameInput()
      ) : showResult ? (
        <div className="test-result-container">
          <h2 className="test-result">결과</h2>
          <p className='test-result-text'>
            성적표가 발급되었습니다 <br />
            <br />
            제주도 사투리 모의고사에 <br />
            응시하느라 고생 많았습니다 <br />
            <br />
            아래 공유하기를 누르시고 <br />
            내 성적표를 확인해 보세요!
          </p>
          {/* <p className="test-result">맞힌 문제 수: {score}</p> */}
          <div className='tt-test-btn-container'>
          
          <button className="tt-test-buttons" onClick={() => {navigate('/')}}>
            홈 화면으로
          </button>
          
          <button className="tt-test-buttons" onClick={handleShare}>카카오톡으로 결과 확인하기</button>
          {/* {!isReviewingWrongAnswers && (
            <button className="tt-test-button" onClick={handleRetryWrongAnswers}>틀린 문제 다시 풀어보기</button>
          )} */}
          
          </div>
        </div>
      ) : (
        renderQuiz()
      )}
    </div>
  );
};

export default QuizApp;
