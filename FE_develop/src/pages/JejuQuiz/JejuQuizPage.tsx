import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// 레벨에 대한 게임 유형 배열
const gameTypes = ["게임 유형 1", "게임 유형 2", "게임 유형 3", "게임 유형 4"];

const LevelPlayScreen: React.FC = () => {
  const [randomGameType, setRandomGameType] = useState<string>("");

  // 레벨 플레이 화면이 처음으로 렌더링될 때 랜덤한 게임 유형 선택
  useEffect(() => {
    chooseRandomGameType();
  }, []);

  // 랜덤한 게임 유형 선택 함수
  const chooseRandomGameType = () => {
    const randomIndex = Math.floor(Math.random() * gameTypes.length);
    const selectedGameType = gameTypes[randomIndex];
    setRandomGameType(selectedGameType);
  };

  return (
    <div>
      <h2>Random Game Type: {randomGameType}</h2>
      {/* 선택된 랜덤한 게임 유형을 이용하여 게임 컴포넌트를 렌더링 */}
      {/* 예: <RandomGameComponent gameType={randomGameType} /> */}
    </div>
  );
};

// 더미 게임 컴포넌트 예시
// 실제 게임 컴포넌트를 렌더링하는 방법은 여기에 추가할 수 있습니다.
// 예시로 각 게임 유형에 대한 컴포넌트를 만들어서 렌더링할 수 있습니다.

// const RandomGameComponent: React.FC<{ gameType: string }> = ({ gameType }) => {
//   switch (gameType) {
//     case "게임 유형 1":
//       return <GameType1 />;
//     case "게임 유형 2":
//       return <GameType2 />;
//     case "게임 유형 3":
//       return <GameType3 />;
//     case "게임 유형 4":
//       return <GameType4 />;
//     default:
//       return <div>No Game Component</div>;
//   }
// };

// 예시 게임 컴포넌트
// const GameType1: React.FC = () => {
//   return <div>Game Type 1 Component</div>;
// };

// const GameType2: React.FC = () => {
//   return <div>Game Type 2 Component</div>;
// };

// const GameType3: React.FC = () => {
//   return <div>Game Type 3 Component</div>;
// };

// const GameType4: React.FC = () => {
//   return <div>Game Type 4 Component</div>;
// };

export default LevelPlayScreen;
