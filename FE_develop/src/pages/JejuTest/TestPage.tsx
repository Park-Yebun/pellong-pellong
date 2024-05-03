import React, { useState } from 'react';

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
      question: '2+2는?',
      options: ['1', '3', '4', '5'],
      correctAnswerIndex: 2,
    },
    // 다른 문제들 추가
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);

  const handleAnswerSelection = (selectedOptionIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setWrongAnswers([]);
  };

  return (
    <div>
      {showResult ? (
        <div>
          <h2>결과</h2>
          <p>맞힌 문제 수: {score}</p>
          <button onClick={restartQuiz}>다시 시작하기</button>
          <button onClick={() => setShowResult(false)}>틀린 문제 다시 풀기</button>
        </div>
      ) : (
        <div>
          <h2>문제 {currentQuestionIndex + 1}</h2>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index} onClick={() => handleAnswerSelection(index)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
