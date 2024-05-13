import React, { useState } from 'react';
import './QuizType4.css'; // CSS 파일 추가

interface QuizType4Props {
  onAnswer: (isCorrect: boolean) => void
}

const QuizType4: React.FC<QuizType4Props> = ({ onAnswer }) => {
  const dialectWord = '사투리단어';
  const standardWords = ['표준어1', '표준어2', '표준어3']; // 여기에 실제 데이터를 사용할 수도 있습니다.

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkAnswer = (selected: string) => {
    if (selected === dialectWord) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="QT4-container">
      <h3>뜻이 일치하는 단어를 고르세요</h3>
      <p>{dialectWord}</p>
      <div className="QT4-button-container">
        {standardWords.map((word, index) => (
          <button
            key={index}
            onClick={() => checkAnswer(word)}
            className="QT4-button" // 버튼 클래스 추가
          >
            {word}
          </button>
        ))}
      </div>
      {isCorrect !== null && (
        <p className="QT4-message">{isCorrect ? '정답입니다!' : '틀렸습니다!'}</p>
      )}
    </div>
  );
};

export default QuizType4;
