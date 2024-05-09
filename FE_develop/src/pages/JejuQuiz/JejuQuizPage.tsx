import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './JejuQuizPage.css';

import QuizType1 from "./QuizType1";
import QuizType2 from "./QuizType2";
import QuizType3 from "./QuizType3";
import QuizType4 from "./QuizType4";
import QuizType5 from "./QuizType5";

const LevelPlayScreen: React.FC = () => {
  const { level } = useParams<{ level?: string }>();

  // 각 레벨에 따른 문제 유형들
  const chapterQuestions = [
    ["QuizType 1", "QuizType 2", "QuizType 3", "QuizType 4", "QuizType 5"],
    ["QuizType 1", "QuizType 2", "QuizType 3", "QuizType 4", "QuizType 5"],
    // 나머지 레벨에 대한 문제 유형들을 추가할 수 있습니다.
  ];

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    // 레벨에 맞는 문제 유형들을 가져옵니다.
    const levelIndex = parseInt(level ?? '1') - 1;
    const levelQuestions = chapterQuestions[levelIndex];
    // 각 문제 유형에서 랜덤하게 10문제를 선택합니다.
    const selectedQuestions: string[] = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * levelQuestions.length);
      selectedQuestions.push(levelQuestions[randomIndex]);
    }
    setQuestions(selectedQuestions);
  }, [level]);

  const nextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div className="level-play-container">
      <h2>Level {level}</h2>
      <div className="question-list">
        {/* 현재 문제 유형을 렌더링합니다. */}
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          renderQuestion(questions[currentQuestionIndex])
        ) : (
          <p>No more questions</p>
        )}
      {currentQuestionIndex < questions.length && (
        <button onClick={nextQuestion}>Next Question</button>
      )}
      </div>
    </div>
  );
};

const renderQuestion = (questionType: string) => {
  switch (questionType) {
    case "QuizType 1":
      return <QuizType1 />;
    case "QuizType 2":
      return <QuizType2 />;
    case "QuizType 3":
      return <QuizType3 />;
    case "QuizType 4":
      return <QuizType4 />;
    case "QuizType 5":
      return <QuizType5 />;
    default:
      return null;
  }
};

export default LevelPlayScreen;
