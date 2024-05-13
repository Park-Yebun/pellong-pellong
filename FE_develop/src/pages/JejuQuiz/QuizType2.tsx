import React, { useState } from 'react';
import './QuizType2.css'; // 게임 느낌의 CSS 파일 추가

const GameType2: React.FC = () => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 정답 여부 상태 추가

  const playAudio = (audioFilePath: string) => {
    // 음성 파일 재생 로직
  };

  const handleOptionSelect = (option: string) => {
    // 정답 여부 확인
    if (option === "Option A") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    // 음성 재생 로직 추가
    const audioFilePath = "path/to/audio/file.mp3";
    playAudio(audioFilePath);
  };

  return (
    <div>
      <div className="QT2-container">
        <p className="QT2-instructions">음성을 듣고 일치하는 답을 선택하세요.</p> {/* 지침 클래스 추가 */}
        <button className="QT2-option-button" onClick={() => handleOptionSelect("Option A")}>Option A</button>
        <button className="QT2-option-button" onClick={() => handleOptionSelect("Option B")}>Option B</button>
        {/* 필요에 따라 더 많은 선택지를 추가하세요 */}
        {isCorrect !== null && <p>{isCorrect ? '정답입니다!' : '틀렸습니다!'}</p>} {/* 정답 표시 추가 */}
      </div>
    </div>
  );
};

export default GameType2;
