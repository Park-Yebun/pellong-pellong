import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './BackButton.css'

import BackArrow from '../assets/back-arrow.png'

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div>
      <a onClick={goBack} className="btn-go-back">
        <img src={BackArrow} alt="" />
      </a>
    </div>
  );
};

export default BackButton;