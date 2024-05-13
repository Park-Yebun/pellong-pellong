import React from "react";

interface QuizType1Props {
  onAnswer: (isCorrect: boolean) => void;
}

const QuizType1: React.FC<QuizType1Props> = ({ onAnswer }) => {
  // 가정: 정답은 0번째 옵션입니다.
  const correctOptionIndex = 0;
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleOptionSelect = (optionIndex: number) => {
    const isCorrect = optionIndex === correctOptionIndex;
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h2>Question 1</h2>
      {options.map((option, index) => (
        <button key={index} onClick={() => handleOptionSelect(index)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuizType1;
