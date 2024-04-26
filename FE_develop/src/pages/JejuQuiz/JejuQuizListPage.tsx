// LevelPlayScreen.tsx
import React from "react";
import { useParams } from "react-router-dom";

const LevelPlayScreen: React.FC = () => {
  const { level } = useParams<{ level: string }>();

  return (
    <div>
      <h2>Level {level}</h2>
      {/* Add game play components and logic here */}
    </div>
  );
};

export default LevelPlayScreen;
