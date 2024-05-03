import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Exam from '../../assets/exam.png';
import './TestFirstPage.css'; // CSS 파일 임포트

const TestFirstPage = () => {
  return (
    <div className="test-first-container">
      <BackButton />
      <h1 className="test-title">사투리 모의고사</h1>
      <img className="examImage" src={Exam} alt="Exam image" />
      <div className='descri-container'>
        <div className="descri">1. 본 모의고사는 총 15문제로 이루어져 있습니다.</div>
        <div className="descri">2. 한번 정답을 낸 문제는 다시 풀 수 없으니 주의하십시오.</div>
        <div className="descri">3. 문제 풀이의 제한시간은 없으나, 시간은 기록됩니다.</div>
        <div className="descri">4. 중간에 X 버튼을 눌러 모의고사를 종료할 수 있으나, 진행 사항이 저장되지는 않습니다.</div>
        <div className="descri">5. 본 모의고사로 대학입시에 도전할 수... 는 없습니다.</div>
      </div>
      <a href="/jeju-test/test-page" className="test-next">
        다음으로
      </a>
    </div>
  );
};

export default TestFirstPage;
