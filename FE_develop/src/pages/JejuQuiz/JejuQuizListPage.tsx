import React from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import BackButton from '../../components/BackButton'

const LevelPlayScreen: React.FC = () => {
  const { level } = useParams<{ level: string }>();

  return (
    <div>
      <BackButton />
      <h2>Level {level}</h2>
      {/* Add game play components and logic here */}
    </div>
  );
};

export default LevelPlayScreen;
