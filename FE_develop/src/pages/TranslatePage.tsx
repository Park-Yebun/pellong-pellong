import React, { useState } from 'react';
import styled from 'styled-components';
import { FaExchangeAlt } from 'react-icons/fa';
import background from '../assets/translate-background.png';

// Container 스타일 컴포넌트
const Container = styled.div`
  // width: 360px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${background}) center center / cover no-repeat;
`;

// Title 스타일 컴포넌트
const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

// Subtitle 스타일 컴포넌트
const Subtitle = styled.h2`
  font-size: 20px;
  text-align: center;
  margin: 10px 0;
`;


// TextArea 스타일 컴포넌트
const TextArea = styled.textarea`
  width: 300px;
  height: 100px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

// Button 스타일 컴포넌트
const Button = styled.button`
  width: 200px;
  height: 40px;
  margin: 10px 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

// ResetButton 스타일 컴포넌트
const ResetButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #e53935;
  }
`;

// IconButton 스타일 컴포넌트
const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
  font-size: 24px;
  color: #333;
`;

// API 요청 함수
const fetchTranslation = async (text: string, direction: 'to_jeju' | 'to_standard'): Promise<string> => {
  try {
    const response = await fetch('https://www.saturituri.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_text: text,
        direction: direction,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.translated_text;
  } catch (error) {
    console.error('Error fetching translation:', error);
    return '번역 실패';
  }
};

const TranslatePage: React.FC = () => {
  const [standardText, setStandardText] = useState<string>('');
  const [jejuText, setJejuText] = useState<string>('');
  const [isStandardToJeju, setIsStandardToJeju] = useState<boolean>(true);

  // 표준어 입력 핸들러
  const handleStandardChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setStandardText(text);
  };

  // 제주어 입력 핸들러
  const handleJejuChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJejuText(text);
  };

  // 번역 함수
  const translate = async () => {
    const text = isStandardToJeju ? standardText : jejuText;
    const direction = isStandardToJeju ? 'to_jeju' : 'to_standard';
    const translatedText = await fetchTranslation(text, direction);

    if (isStandardToJeju) {
      setJejuText(translatedText);
    } else {
      setStandardText(translatedText);
    }
  };

  // 번역 방향 전환 핸들러
  const toggleTranslationDirection = () => {
    setIsStandardToJeju(!isStandardToJeju);
    setStandardText(jejuText);
    setJejuText(standardText);
  };

  // 초기화 핸들러
  const handleReset = () => {
    setStandardText('');
    setJejuText('');
  };

  return (
    <Container>
      <Title>제주어 번역기</Title>
      <Subtitle>{isStandardToJeju ? '표준어' : '제주어'}</Subtitle>
      <TextArea 
        value={isStandardToJeju ? standardText : jejuText} 
        onChange={isStandardToJeju ? handleStandardChange : handleJejuChange} 
      />
      <IconButton onClick={toggleTranslationDirection}>
        <FaExchangeAlt />
      </IconButton>
      <Subtitle>{isStandardToJeju ? '제주어' : '표준어'}</Subtitle>
      <TextArea 
        value={isStandardToJeju ? jejuText : standardText} 
        readOnly 
      />
      <Button onClick={translate}>번역하기</Button>
      <ResetButton onClick={handleReset}>초기화</ResetButton>
    </Container>
  );
};

export default TranslatePage;
