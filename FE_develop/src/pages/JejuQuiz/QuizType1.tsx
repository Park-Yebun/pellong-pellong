import React from "react";

interface QuizType1Props {
  quizData: {
    quizId: number;
    quizChapterNo: number;
    quizNo: number;
    quizCategory: number;
    quizAnswer: number;
    dialectVocas: {
      quizOrder: number;
      quizContent: string | null;
      standardText: string;
      dialectText: string;
      dialectVoice: string;
      dialectImage: string;
    }[];
  };
  onAnswer: (isCorrect: boolean) => void;
}

const QuizType1: React.FC<QuizType1Props> = ({ quizData, onAnswer }) => {
  // 가정: 정답은 0번째 옵션입니다.
  const correctOptionIndex = quizData.quizAnswer - 1; // 정답 번호는 1부터 시작하므로 1을 빼줍니다.
  const options = quizData.dialectVocas.map((dialectVoca) => dialectVoca.dialectText);

  const handleOptionSelect = (optionIndex: number) => {
    const isCorrect = optionIndex === correctOptionIndex;
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h2>Question {quizData.quizNo}</h2>
      {options.map((option, index) => (
        <button key={index} onClick={() => handleOptionSelect(index)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuizType1;
