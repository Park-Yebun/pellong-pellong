import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './QuizResultPage.css'
import useStore from '../../store';

interface QuizResultPageProps {
  score: number;
  totalQuestions: number;
}

const QuizResultPage: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state as QuizResultPageProps;

  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log(store.loginUserInfo?.memberId)
        const response = await fetch(`https://www.saturituri.com/api/exp/quiz-solving/${store.loginUserInfo?.memberId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
        // 데이터 처리
      } catch (error) {
        console.error("API 호출에 실패했습니다:", error);
      }
    };

    fetchData(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

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
