import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton'

const TestFirstPage = () => {
  return (
    <div>
      <BackButton />
      <h1>사투리 모의고사</h1>
      <p>사투리 모의고사 시작 페이지입니다</p>
    </div>
  );
};

export default TestFirstPage;