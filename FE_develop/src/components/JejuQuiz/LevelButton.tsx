// LevelButton.tsx
import React from "react";
import { Link } from "react-router-dom";

interface LevelButtonProps {
  level: number;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level }) => {
  return (
    <Link to={`/level/${level}`}>
      <button>Level {level}</button>
    </Link>
  );
};

export default LevelButton;
