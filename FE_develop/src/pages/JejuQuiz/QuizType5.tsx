import React, { useState } from 'react';
import './QuizType5.css'; // CSS 파일 추가

const QuizType5: React.FC = () => {
  // 초기 상태 설정
  const [selectedDialectWords, setSelectedDialectWords] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // 선택된 단어와 이미지를 저장하고, 맞는지 확인하는 함수
  const selectWord = (word: string) => {
    const updatedDialectWords = [...selectedDialectWords, word];
    setSelectedDialectWords(updatedDialectWords);

    // 모든 선택지가 완성되었을 때, 정답 확인
    if (updatedDialectWords.length === 3 && selectedImages.length === 3) {
      const correctSelection = updatedDialectWords.every(word =>
        selectedImages.includes(word)
      );
      setIsCorrect(correctSelection);
    }
  };

  // 이미지 선택 시
  const selectImage = (image: string) => {
    const updatedImages = [...selectedImages, image];
    setSelectedImages(updatedImages);

    // 모든 선택지가 완성되었을 때, 정답 확인
    if (selectedDialectWords.length === 3 && updatedImages.length === 3) {
      const correctSelection = selectedDialectWords.every(word =>
        updatedImages.includes(word)
      );
      setIsCorrect(correctSelection);
    }
  };

  // 재시작 함수
  const restartQuiz = () => {
    setSelectedDialectWords([]);
    setSelectedImages([]);
    setIsCorrect(false);
  };

  return (
    <div className="QT5-container">
      <h3>Quiz Type 5</h3>
      <div className="QT5-content">
        {/* 사투리 단어 선택지 */}
        <div>
          <p>사투리 단어 선택지:</p>
          <button className="QT5-button" onClick={() => selectWord("사투리단어1")}>사투리단어1</button>
          <button className="QT5-button" onClick={() => selectWord("사투리단어2")}>사투리단어2</button>
          <button className="QT5-button" onClick={() => selectWord("사투리단어3")}>사투리단어3</button>
        </div>
        {/* 이미지 선택지 */}
        <div>
          <p>이미지 선택지:</p>
          <button className="QT5-button" onClick={() => selectImage("이미지1")}>이미지1</button>
          <button className="QT5-button" onClick={() => selectImage("이미지2")}>이미지2</button>
          <button className="QT5-button" onClick={() => selectImage("이미지3")}>이미지3</button>
        </div>
        {/* 정답 표시 */}
        {isCorrect && <p className="QT5-message">정답입니다!</p>}
        {/* 재시작 버튼 */}
        <button className="QT5-restart-button" onClick={restartQuiz}>다시 시작</button>
      </div>
    </div>
  );
};

export default QuizType5;