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

  const chapterQuestions = [
    ["QuizType 1"],
    ["QuizType 2"],
    ["QuizType 3"],
    ["QuizType 4"],
    ["QuizType 5"],
  ];

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const levelIndex = parseInt(level ?? '1') - 1;
    const levelQuestions = chapterQuestions[levelIndex];
    const selectedQuestions: string[] = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * levelQuestions.length);
      selectedQuestions.push(levelQuestions[randomIndex]);
    }
    setQuestions(selectedQuestions);
  }, [level]);

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

  return (
    <div className="level-play-container">
      <div className="level-info">Level {level}</div>
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

const renderQuestion = (questionType: string, onAnswer: (isCorrect: boolean) => void) => {
  switch (questionType) {
    case "QuizType 1":
      return <QuizType1 onAnswer={onAnswer} />;
    case "QuizType 2":
      return <QuizType2 onAnswer={onAnswer} />;
    case "QuizType 3":
      return <QuizType3 onAnswer={onAnswer} />;
    case "QuizType 4":
      return <QuizType4 onAnswer={onAnswer} />;
    case "QuizType 5":
      return <QuizType5 onAnswer={onAnswer} />;
    default:
      return null;
  }
};

export default LevelPlayScreen;
