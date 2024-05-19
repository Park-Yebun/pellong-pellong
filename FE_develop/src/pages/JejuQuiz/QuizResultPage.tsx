import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './QuizResultPage.css'

interface QuizResultPageProps {
  score: number;
  totalQuestions: number;
}

const QuizResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state as QuizResultPageProps;

  const handleGoBack = () => {
    navigate("/jeju-quiz"); // 퀴즈 목록 페이지로 이동
  };

  return (
    <div className="quiz-result-container">
      <h1>퀴즈 결과</h1>
      <p>맞춘 개수: {score} / {totalQuestions}</p>
      <button onClick={handleGoBack}>퀴즈 목록으로 돌아가기</button>
    </div>
  );
};

export default QuizResultPage;
