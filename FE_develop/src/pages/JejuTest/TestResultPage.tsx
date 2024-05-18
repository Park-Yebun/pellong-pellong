import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ResultPage: React.FC = () => {
  // useParams 훅을 사용하여 URL에서 전달된 경로 매개변수를 가져옴
  const { score, testnum, name } = useParams<{ score: string; testnum: string; name: string }>();

  // score를 정수로 파싱하고, undefined인 경우 기본값 0을 사용
  const parsedScore = parseInt(score || '0');

  const getGrade = (score: number): string => {
    if (score <= 1) {
      return "9등급";
    } else if (score <= 2) {
      return "8등급";
    } else if (score <= 3) {
      return "7등급";
    } else if (score <= 4) {
      return "6등급";
    } else if (score <= 6) {
      return "5등급";
    } else if (score <= 8) {
      return "4등급";
    } else if (score <= 10) {
      return "3등급";
    } else if (score <= 12) {
      return "2등급";
    } else if (score <= 15) {
      return "1등급";
    } else {
      return "Unknown"; // 모든 경우에 대한 기본값 설정
    }
  };
  

  // 등급에 따른 백분위 계산 함수
  const getPercent = (grade: string): number => {
    switch (grade) {
      case "1등급":
        return 4;
      case "2등급":
        return 11;
      case "3등급":
        return 23;
      case "4등급":
        return 40;
      case "5등급":
        return 60;
      case "6등급":
        return 77;
      case "7등급":
        return 89;
      case "8등급":
        return 96;
      case "9등급":
        return 100;
      default:
        return 0;
    }
  };

  // 등급 백분위 계산
  const percent = getPercent(getGrade(parsedScore));

  return (
    <div className="test-result-container">
      <h2 className="test-result">제주어 고사 결과</h2>
      <p>수험번호 : {testnum}</p>
      <p>점수 : {parsedScore}</p>
      <p>성명 : {name}</p>
      <p>등급 : {getGrade(parsedScore)}</p>
      <p>백분위 : {percent}</p>
      <Link to="/jeju-test" className="test-button">메인으로</Link>
    </div>

  );
};

export default ResultPage;
