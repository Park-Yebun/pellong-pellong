import React, { useState } from 'react';
import './QuizType1.css';

const GameType1: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const playAudio = (audioFilePath: string) => {
    // 음성 파일 재생 로직
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    // 선택된 옵션 처리 로직
  };

  const playAudioAndRenderOptions = () => {
    const audioFilePath = "path/to/audio/file.mp3";
    playAudio(audioFilePath);

    return (
      <div className="QT1-options-container">
        <p className="QT1-instructions">음성을 듣고 일치하는 답을 선택하세요.</p>
        <button className="QT1-option-button" onClick={() => handleOptionSelect("Option A")}>Option A</button>
        <button className="QT1-option-button" onClick={() => handleOptionSelect("Option B")}>Option B</button>
        <button className="QT1-option-button" onClick={() => handleOptionSelect("Option C")}>Option C</button>
      </div>
    );
  };

  return (
    <div className="QT1-container">
      <h3>Game Type 1</h3>
      {selectedOption ? (
        <p>선택된 옵션: {selectedOption}</p>
      ) : (
        playAudioAndRenderOptions()
      )}
    </div>
  );
};

export default GameType1;
