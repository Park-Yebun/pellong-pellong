import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import './QuizResultPage.css'
import useStore from '../../store';
import { useErrorBoundary } from "react-error-boundary";

interface QuizResultPageProps {
  score: number;
  totalQuestions: number;
  parsedChapterNo: number;
}

const QuizResultPage: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { showBoundary } = useErrorBoundary();
  const { score, totalQuestions, parsedChapterNo } = location.state as QuizResultPageProps;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `https://www.saturituri.com/api/exp/quiz-solving/${store.loginUserInfo?.memberId}`;
      
        // score와 totalQuestions를 비교하여 조건에 따라 apiUrl을 설정
        if (score / totalQuestions >= 0.9) {
          apiUrl = `https://www.saturituri.com/api/exp/quiz-solving-passed/${store.loginUserInfo?.memberId}`;
        }


        const response = await axios.patch(apiUrl, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // console.log(response)
        // 데이터 처리
      } catch (error) {
        showBoundary(error);
        console.error("API 호출에 실패했습니다:", error);
      }
    };


    const fetchLP = async () => {
      try {
        const updatedChapterNo = parsedChapterNo + 1;
        const response = await axios.patch(`https://www.saturituri.com/api/learning/${store.loginUserInfo?.memberId}/${updatedChapterNo}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // console.log("성공얍", response)
        // 데이터 처리
      } catch (error) {
        showBoundary(error);
        console.error("API 호출에 실패했습니다:", error);
      }
    };

    fetchLP();
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
