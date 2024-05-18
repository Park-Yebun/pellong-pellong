import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 import 합니다.
import BackButton from '../../components/BackButton';
import './TestPage.css'; // CSS 파일을 import 합니다.

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
  const [userName, setUserName] = useState<string>('');
  const [isUserNameSubmitted, setIsUserNameSubmitted] = useState<boolean>(false);

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

  const handleShare = () => {
    console.log("공유하기 버튼이 클릭되었습니다!");
    var resultImg = '../../icons/apple-touch-icon-152x152.png';

    const shareTitle = '제주어 모의고사 결과';
    const shareDes = '공유디스크립션';
    // 공유 로직 추가
  };

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUserNameSubmitted(true);
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

  const renderNameInput = () => {
    return (
      <div className="tt-name-input-container">
        <h2>이름을 입력하세요</h2>
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
      <BackButton />
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
          <div className='test-btn-container'>
            <button className="tt-test-button" onClick={handleShare}>공유하기</button>
          </div>
        </div>
      ) : (
        renderQuiz()
      )}
    </div>
  );
};

export default QuizApp;
