import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import profileImg from '../../../assets/JejuPlay/profile.png'
import useStore from '../../../store';
import useWebsocket from '../../../contexts/useWebsocket';
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
    Timer,
    ExampleImg,
} from './SpeedPlayPage.styled'

// 웹소켓 통신
import SockJS from 'sockjs-client';
import {Stomp, Frame} from '@stomp/stompjs';
import { userInfo } from 'os';

interface UserInfo {
  guestId: number;
  nickname: string;
  profileImg: string;
  memberId: number;
}


interface EnhancedUserInfo extends UserInfo {
  correctCount: number;
  alert: string;
}

const SpeedPlayPage = () => {
  const { connected, connect, disconnect, client } = useWebsocket();
  const [count, setCount] = useState(10);
  const [quizList, setQuizList] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any|null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);
  const { partyId } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const location = useLocation();
  const [isDone, setIsDone] = useState<boolean>(false);

  // 유저 관련 변수들
  const userInfos = location.state?.userInfos;
  const [players, setPlayers] = useState<EnhancedUserInfo[]>(userInfos.map((user: UserInfo) => ({
    ...user,
    correctCount: 0,
    alert: ''
  })));


const handleClick = (option:any) => {
  if (option === quiz.false && client) {
    const numPartyId = Number(partyId)
    client.publish({
      destination: `/app/party/${numPartyId}/correct/${store.loginUserInfo?.memberId}`,
      body: ''
    });
  } else if (option !== quiz.false && client) {
    const numPartyId = Number(partyId)
    client.publish({
      destination: `/app/party/${numPartyId}/wrong/${store.loginUserInfo?.memberId}`,
      body: ''
    });
  }
}

useEffect(() => {
  connect();
}, [connect]);

// 시간 제한
useEffect(() => {
  const id = setInterval(() => {
      setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0); 
  }, 1000);
  return () => clearInterval(id);
}, []);

useEffect(() => {
  if (connected && client) {
    console.log("구독 요청을 보냅니다.");
    const numPartyId = Number(partyId)
    const subscription = client.subscribe(`/topic/party/` + numPartyId, (message) => {
      const data = JSON.parse(message.body);
      console.log('구독 요청 후 응답 데이터!!', data);

      // 1. 정답/오답 메세지 받아올경우
      if (data.type == 'correct' || data.type == 'wrong') {
        setPlayers(prevPlayers => prevPlayers.map(player => {
          console.log(player.memberId)
          if (player.memberId === data.memberId) {
            return {
              ...player,
              correctCount: data.type === 'correct' ? player.correctCount + 1 : player.correctCount,
              alert: data.type === 'correct' ? '정답!' : '오답!'
            };
          }
          return player;
        }));
      }
      console.log(players)

    });
  }
}, [connected]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/dialect/speed/quiz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (data.length > 0) {
        const quiz = data[Math.floor(Math.random() * data.length)];
        setQuiz(quiz);
      }
    } catch (error) {
      console.error('Data load failed:', error);
    }
  };
  fetchData();
}, []);

// 퀴즈 들어올때마다 셔플
useEffect(() => {
  if (quiz) {
    const options = [
    quiz.dialectText,
    quiz.standardText,
    quiz.false,
    quiz.dialectImage
  ];
  const shuffled = options.sort(() => Math.random() - 0.5);
  setShuffledOptions(shuffled);
  }
}, [quiz]);


  return (
    <Container>
        <TimerBox>
            <Timer width={(count / 10) * 100} count={count}></Timer>
        </TimerBox>
        <Description>뜻이 다른 한 장을 <br/>
          제외한 카드를 터치하세요.</Description>
        <ExampleBox>
        {shuffledOptions.map((option, index) => {
            // Assume the original image URL is still in the shuffled options
            if (option === quiz.dialectImage) {
              return <ExampleImg key={index} src={option} alt="Dialect" onClick={() => handleClick(option)}/>;
            } else {
              return <Example key={index} onClick={() => handleClick(option)} >{option}</Example>;
            }
          })}
        </ExampleBox>
        <PlayerBox>
        {players.map((player) => (
          <Player key={player.guestId}>
              <ExpBadge>{player.alert}</ExpBadge>
              <ProfileImg src={player.profileImg} alt='profile-image'></ProfileImg>
              <Nickname>{player.nickname}</Nickname>
          </Player>
        ))}
        </PlayerBox>
    </Container>
  );
};

export default SpeedPlayPage;