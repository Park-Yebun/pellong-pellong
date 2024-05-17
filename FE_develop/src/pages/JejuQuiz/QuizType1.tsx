import React, { useState } from "react";
import "./QuizType1.css"; // CSS 파일 임포트

import hanrabong from '../../assets/hanrabong.png';

interface Voca {
  quizOrder: number;
  quizContent: string | null;
  standardText: string;
  dialectText: string;
  dialectVoice: string;
  dialectImage: string;
}

interface QuizData {
  quizId: number;
  quizChapterNo: number;
  quizNo: number;
  quizCategory: number;
  quizAnswer: number;
  dialectVocas: Voca[];
}

const QuizType1: React.FC<{ quizData: QuizData; onNextQuestion: () => void }> = ({ quizData, onNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === quizData.quizAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setIsCorrect(null);
    setSelectedAnswer(null);
    onNextQuestion();
  };

  return (
    <div className="QT1-container">
      <div className="QT1-quiz-header">
        <div className="QT1-tinum">
          <div className="QT1-quiz-title">Quiz</div>
          <div className="QT1-quiz-nums">문제 {quizData.quizNo}번</div>
        </div>
        <div className="QT1-quiz-text">
          뜻이 일치하는<br />
          문장을 고르시오
        </div>
      </div>
      <div className="QT1-quiz-content">
        {/* <div className="QT1-standard-text">
          <p>표준어:</p>
          <div>{quizData.dialectVocas[0].standardText}</div>
        </div> */}
        <div className="QT1-dialect-container">
          <img src={hanrabong} alt="" className="QT1-dialect-img" />
          <div className="QT1-dialect-text">{quizData.dialectVocas[0].dialectText}</div>
        </div>
        {/* <div className="QT1-image-container">
          <img src={quizData.dialectVocas[0].dialectImage} alt="Dialect Image" />
        </div> */}
        <div className="QT1-audio-container">
          <audio controls>
            <source src={quizData.dialectVocas[0].dialectVoice} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <div className="QT1-options-container">
        {quizData.dialectVocas.map((voca, index) => (
          <div key={index} className="QT1-option-item">
            <button
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`QT1-option-button ${selectedAnswer !== null && selectedAnswer === index ? (isCorrect ? "correct" : "incorrect") : ""}`}
            >
              {voca.standardText}
            </button>
          </div>
        ))}
      </div>
      {selectedAnswer !== null && (
        <div className="QT1-answer-feedback">
          {isCorrect ? <p className="QT1-correct-feedback">맞았읍니다!</p> : <p className="QT1-incorrect-feedback">틀렸어용!</p>}
          <button onClick={handleNextQuestion} className="QT1-next-button">다음 문제로</button>
        </div>
      )}
    </div>
  );
};

export default QuizType1;
