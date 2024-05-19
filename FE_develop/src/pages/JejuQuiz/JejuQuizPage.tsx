import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import QuizType1 from "./QuizType1";
import QuizType2 from "./QuizType2";
import QuizType3 from "./QuizType3";

const LevelPlayScreen: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  // console.log("챕터", level)
  const parsedChapterNo = parseInt(level ?? "1", 10); // 문자열을 숫자로 변환
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://www.saturituri.com/api/quiz/${parsedChapterNo}`);
        const data = response.data;
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
  
    fetchQuestions();
  }, [parsedChapterNo]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // 퀴즈가 끝났을 때 결과 페이지로 이동
      navigate("/jeju-quiz/result", { state: { score, totalQuestions: questions.length, parsedChapterNo } });
    }
  };

  const handleCorrectAnswer = () => {
    setScore(prevScore => prevScore + 1); // 정답 맞췄을 때 점수 업데이트
  };

  const renderQuizComponent = (index: number, quizData: any) => {
    const quizTypeIndex = index % 3;
    switch (quizTypeIndex) {
      case 0:
        return <QuizType1 quizData={quizData} onNextQuestion={handleNextQuestion} onCorrectAnswer={handleCorrectAnswer} />;
      case 1:
        return <QuizType2 quizData={quizData} onNextQuestion={handleNextQuestion} onCorrectAnswer={handleCorrectAnswer} />;
      case 2:
        return <QuizType3 quizData={quizData} onNextQuestion={handleNextQuestion} onCorrectAnswer={handleCorrectAnswer} />;
      default:
        return <p>알 수 없는 퀴즈 유형입니다.</p>;
    }
  };

  return (
    <div className="level-play-container">
      {questions.length > 0 ? (
        <div className="question-list">
          {currentQuestionIndex < questions.length ? (
            renderQuizComponent(currentQuestionIndex, questions[currentQuestionIndex])
          ) : (
            <p>더 이상 문제가 없습니다.</p>
          )}
        </div>
      ) : (
        <p>불러오는중...</p>
      )}
    </div>
  );
};

export default LevelPlayScreen;
