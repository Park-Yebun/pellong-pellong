import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../../assets/JejuPlay/profile.png'
import {
    Example,
    CheckBadge,
    Container,
    ExampleBox,
    ExpBadge,
    Nickname,
    Player,
    PlayerBox,
    ProfileImg,
    TimerBox,
    Description,
    Timer
} from './SpeedPlayPage.styled'

const SpeedPlayPage = () => {
const [count, setCount] = useState(10);
const [quizList, setQuizList] = useState<any[]>([]);
const [quiz, setQuiz] = useState<any|null>(null);

useEffect(() => {
  const id = setInterval(() => {
      setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0); 
  }, 1000);
  return () => clearInterval(id);
}, []);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://www.saturituri.com/dialect/speed/quiz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setQuizList(data);
      const randomIndex = Math.floor(Math.random() * 10);
      setQuiz(quizList[randomIndex]);
      console.log('데이터 로드 성공')
    } catch (error) {
      console.log('데이터 로드 실패', error)
    }
  }
  fetchData()
}, []);

  return (
    <Container>
        <TimerBox>
            <Timer width={(count / 10) * 100} count={count}></Timer>
        </TimerBox>
        <Description>뜻이 다른 한 장을 <br/>
          제외한 카드를 터치하세요.</Description>
        <ExampleBox>
            <Example></Example>
            <Example></Example>
            <Example></Example>
            <Example></Example>
        </ExampleBox>
        <PlayerBox>
            <Player>
                <ExpBadge></ExpBadge>
                <ProfileImg src={profileImg}></ProfileImg>
                <Nickname>예분</Nickname>
            </Player>
            <Player>
                <ExpBadge></ExpBadge>
                <ProfileImg src={profileImg}></ProfileImg>
                <Nickname>세영</Nickname>
            </Player>
            <Player>
                <ExpBadge></ExpBadge>
                <ProfileImg src={profileImg}></ProfileImg>
                <Nickname>홍찬</Nickname>
            </Player>
            <Player>
                <ExpBadge></ExpBadge>
                <ProfileImg src={profileImg}></ProfileImg>
                <Nickname>준형</Nickname>
            </Player>
        </PlayerBox>
    </Container>
  );
};

export default SpeedPlayPage;