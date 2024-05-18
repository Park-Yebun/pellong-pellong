import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 import 합니다.
import './TestPage.css'; // CSS 파일을 import 합니다.

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
    console.log("공유하기 버튼이 클릭되었습니다!");

    if(!Kakao.isInitialized()){
      Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }

    try{
        // 공유할 이미지, 추후 합의 필요
        const shareTitle = '제주어 모의고사 결과'
        const shareDes = '공유디스크립션'
        const shareImage = '../../icons/apple-touch-icon-152x152.png'
        const shareURL = 'https://www.saturituri.com/'

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
              title: '결과확인하기',
              link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL,
              },
            },
          ]
        });
    } catch (error) {
      console.log(error);
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

  return (
    <div className="test-container">
      {showResult ? (
        <div className="test-result-container">
          <h2 className="test-result">결과</h2>
          <p className="test-result">맞힌 문제 수: {score}</p>
          <div className='test-btn-container'>
            <Link to="/jeju-test" className="test-button">메인으로</Link>
            <button className="test-button" onClick={handleShare}>공유하기</button>
            {!isReviewingWrongAnswers && (
              <button className="test-button" onClick={handleRetryWrongAnswers}>틀린 문제 다시 풀어보기</button>
            )}
          </div>
        </div>
      ) : (
        renderQuiz()
      )}
    </div>
  );
};

export default QuizApp;