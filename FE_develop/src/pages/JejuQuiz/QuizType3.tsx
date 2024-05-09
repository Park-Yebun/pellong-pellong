import React, { useState } from 'react';
import './QuizType3.css'; // CSS 파일 추가

const GameType3: React.FC = () => {
  // 더미 데이터 정의
  const dummyData = [
    {
      word: '사과',
      images: [
        '/path/to/apple1.jpg',
        '/path/to/apple2.jpg',
        '/path/to/apple3.jpg',
        '/path/to/apple4.jpg',
      ],
      correctIndex: 0, // 정답 이미지의 인덱스
    },
    {
      word: '고양이',
      images: [
        '/path/to/cat1.jpg',
        '/path/to/cat2.jpg',
        '/path/to/cat3.jpg',
        '/path/to/cat4.jpg',
      ],
      correctIndex: 1, // 정답 이미지의 인덱스
    },
    // 다른 더미 데이터들 추가 가능
  ];

  // 상태 설정
  const [currentGame, setCurrentGame] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // 게임 데이터 가져오기
  const { word, images, correctIndex } = dummyData[currentGame];

  // 정답 확인 함수
  const checkAnswer = () => {
    if (selectedImage === correctIndex) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // 다음 게임으로 이동 함수
  const nextGame = () => {
    setCurrentGame(currentGame + 1);
    setSelectedImage(null);
    setIsCorrect(null);
  };

  return (
    <div className="QT3-container">
      <h3>Game Type 3</h3>
      <div>
        <p>단어: {word}</p>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            onClick={() => setSelectedImage(index)}
            className="QT3-image" // 이미지 클래스 추가
          />
        ))}
        <button onClick={checkAnswer} className="QT3-button">제출</button>
        {isCorrect !== null && (
          <p className="QT3-message">{isCorrect ? '정답입니다!' : '틀렸습니다!'}</p>
        )}
        {isCorrect !== null && (
          <button onClick={nextGame} className="QT3-button">다음 문제</button>
        )}
      </div>
    </div>
  );
};

export default GameType3;
