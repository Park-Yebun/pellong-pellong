import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Axios 라이브러리 임포트
import QuizType1 from "./QuizType1";
import QuizType2 from "./QuizType2";
import QuizType3 from "./QuizType3";
import QuizType4 from "./QuizType4";
import QuizType5 from "./QuizType5";

const LevelPlayScreen: React.FC = () => {
  const { chapterNo } = useParams<{ chapterNo: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/quiz/${chapterNo}`); // 백엔드에서 데이터 가져오기
        setQuestions(response.data); // 받은 데이터를 상태에 설정
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
  
    fetchQuestions();
  }, [chapterNo]); // chapterNo가 변경될 때마다 useEffect가 다시 실행됨

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      alert(`Quiz completed! Your score: ${score + (isCorrect ? 1 : 0)}/${questions.length}`);
    }
  };

  const renderQuestion = (questionType: string, onAnswer: (isCorrect: boolean) => void) => {
    switch (questionType) {
      case "QuizType 1":
        return <QuizType1 quizData={questions[currentQuestionIndex]} onAnswer={onAnswer} />;
      // case "QuizType 2":
      //   return <QuizType2 quizData={questions[currentQuestionIndex]} onAnswer={onAnswer} />;
      // case "QuizType 3":
      //   return <QuizType3 quizData={questions[currentQuestionIndex]} onAnswer={onAnswer} />;
      // case "QuizType 4":
      //   return <QuizType4 quizData={questions[currentQuestionIndex]} onAnswer={onAnswer} />;
      // case "QuizType 5":
      //   return <QuizType5 quizData={questions[currentQuestionIndex]} onAnswer={onAnswer} />;
      default:
        return null;
    }
  };

  return (
    <div className="level-play-container">
      <div className="level-info">Chapter {chapterNo}</div>
      <div className="question-list">
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          renderQuestion(questions[currentQuestionIndex], handleAnswer)
        ) : (
          <p>No more questions</p>
        )}
      </div>
    </div>
  );
};

export default LevelPlayScreen;
