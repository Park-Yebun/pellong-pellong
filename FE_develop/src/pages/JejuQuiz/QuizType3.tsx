import React, { useState } from "react";
import "./QuizType1.css"; // CSS 파일 임포트

import hanrabong from '../../assets/hanrabong.png'; // 이미지 파일 임포트

// Voca 인터페이스 정의
interface Voca {
  quizOrder: number;
  quizContent: string | null;
  standardText: string;
  dialectText: string;
  dialectVoice: string;
  dialectImage: string;
}

// QuizData 인터페이스 정의
interface QuizData {
  quizId: number;
  quizChapterNo: number;
  quizNo: number;
  quizCategory: number;
  quizAnswer: number;
  dialectVocas: Voca[];
}

// QuizType1 컴포넌트 정의
const QuizType3: React.FC<{ quizData: QuizData; onNextQuestion: () => void; onCorrectAnswer: () => void }> = ({ quizData, onNextQuestion, onCorrectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // 선택된 답 저장
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 정답 여부 저장

  // 사용자가 답을 선택했을 때 호출되는 함수
  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex); // 선택된 답 업데이트
    const selectedVoca = quizData.dialectVocas[answerIndex];
    if (selectedVoca.quizOrder === quizData.quizAnswer) {
      setIsCorrect(true); // 정답인 경우
      onCorrectAnswer(); // 정답 맞췄을 때 부모 컴포넌트로 콜백 호출
    } else {
      setIsCorrect(false); // 오답인 경우
    }
  };

  // 다음 문제로 넘어갈 때 호출되는 함수
  const handleNextQuestion = () => {
    setIsCorrect(null); // 정답 여부 초기화
    setSelectedAnswer(null); // 선택된 답 초기화
    onNextQuestion(); // 부모 컴포넌트의 onNextQuestion 함수 호출
  };

  // 정답에 해당하는 항목 가져오기
  const correctVoca = quizData.dialectVocas.find(voca => voca.quizOrder === quizData.quizAnswer);

  return (
    <div className="QT1-container">
      <div className="QT1-quiz-header">
        <div className="QT1-tinum">
          <div className="QT1-quiz-title">Quiz</div>
          <div className="QT1-quiz-nums">문제 {quizData.quizNo}번</div>
        </div>
        <div className="QT1-quiz-text">
          이미지와 뜻이 일치하는<br />
          단어를 고르시오
        </div>
      </div>
      <div className="QT1-quiz-content">
        {/* <div className="QT1-dialect-container">
          <img src={hanrabong} alt="" className="QT1-dialect-img" />
          <div className="QT1-dialect-text">{correctVoca?.dialectText}</div>
        </div> */}
        <div className="QT1-image-container">
          <img src={correctVoca?.dialectImage} alt="Dialect Image" />
        </div>
        {/* <div className="QT1-audio-container">
          <audio controls>
            <source src={correctVoca?.dialectVoice} type="audio/mpeg" />
          </audio>
        </div> */}
      </div>
      <div className="QT1-options-container">
        {quizData.dialectVocas.map((voca, index) => (
          <div key={index} className="QT1-option-item">
            <button
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`QT1-option-button ${selectedAnswer !== null && selectedAnswer === index ? (isCorrect ? "correct" : "incorrect") : ""}`}
            >
              {voca.dialectText}
            </button>
          </div>
        ))}
      </div>
      {selectedAnswer !== null && (
        <div className="QT1-answer-feedback">
          {isCorrect ? <p className="QT1-correct-feedback">맞아수다!</p> : <p className="QT1-incorrect-feedback">틀렸수다!</p>}
          <button onClick={handleNextQuestion} className="QT1-next-button">다음 문제로</button>
        </div>
      )}
    </div>
  );
};

export default QuizType3;
