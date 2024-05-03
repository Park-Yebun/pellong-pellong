import React, { useState } from 'react';

const ProblemSolver: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const generateProblem = () => {
    const newNum1 = Math.floor(Math.random() * 10);
    const newNum2 = Math.floor(Math.random() * 10);
    setNum1(newNum1);
    setNum2(newNum2);
    setResult(null);
  };

  const solveProblem = () => {
    const sum = num1 + num2;
    setResult(sum);
  };

  return (
    <div>
      <h2>덧셈 문제 풀기</h2>
      <p>
        {num1} + {num2} = {result !== null ? result : '??'}
      </p>
      <button onClick={generateProblem}>새 문제 생성</button>
      <button onClick={solveProblem}>문제 풀기</button>
    </div>
  );
};

export default ProblemSolver;
