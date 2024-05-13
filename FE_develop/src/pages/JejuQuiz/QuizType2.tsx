import React, { useState } from 'react';
import './QuizType2.css';

interface QuizType2Props {
  onAnswer: (isCorrect: boolean) => void;
}

const QuizType2: React.FC<QuizType2Props> = ({ onAnswer }) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (option: string) => {
    const isCorrect = option === "Option A";
    setIsCorrect(isCorrect);
    onAnswer(isCorrect);
  };

  return (
    <div className="QT2-container">
      <button onClick={() => handleOptionSelect("Option A")}>Option A</button>
      <button onClick={() => handleOptionSelect("Option B")}>Option B</button>
      {isCorrect !== null && <p>{isCorrect ? 'Correct!' : 'Incorrect!'}</p>}
    </div>
  );
};

export default QuizType2;
