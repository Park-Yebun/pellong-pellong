import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import QuizType1 from "./QuizType1";
// 다른 유형의 퀴즈 컴포넌트들을 가져옵니다.

const LevelPlayScreen: React.FC = () => {
  const { chapterNo } = useParams<{ chapterNo: string }>();
  const parsedChapterNo = parseInt(chapterNo ?? "1", 10); // 문자열을 숫자로 변환
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://www.saturituri.com/api/quiz/${parsedChapterNo}`);
        const data = response.data;
        // console.log("응답 데이터:", response.data);
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
      // 퀴즈가 끝났을 때 처리할 로직을 여기에 추가합니다.
      alert(`퀴즈 끝! 점수: ${score}/${questions.length}`);
      navigate("/jeju-quiz"); // 리디렉션
    }
  };

  return (
    <div className="level-play-container">
      {questions.length > 0 ? (
        <>
          <div className="question-list">
            {currentQuestionIndex < questions.length ? (
              <QuizType1
                quizData={questions[currentQuestionIndex]}
                onNextQuestion={handleNextQuestion}
              />
            ) : (
              <p>더 이상 문제가 없습니다.</p>
            )}
          </div>
        </>
      ) : (
        <p>불러오는중...</p>
      )}
    </div>
  );
};

export default LevelPlayScreen;
