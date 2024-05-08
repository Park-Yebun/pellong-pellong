import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './BackButton.css'

import BackArrow from '../assets/back-arrow.png'

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/'); // Navigate to the home page
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