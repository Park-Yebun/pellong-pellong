import React from 'react';
import { Link } from 'react-router-dom';
import './LevelPath.css'; // Import the CSS file

const levels = Array.from({ length: 10 }, (_, i) => i + 1);

const LevelPath: React.FC = () => {
  return (
    <div className="level-path-container">
      <div className="level-path-header">가족</div>
      <div className="level-path">
        {levels.map((level, index) => (
          <React.Fragment key={level}>
            {index > 0 && (
              <div className={`stepping-stones stones-${index}`}>
                <div className="stone"></div>
              </div>
            )}
            <Link to={`/jeju-quiz/level/${level}`} className={`level-circle level-${level}`}>
              {level}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LevelPath;
