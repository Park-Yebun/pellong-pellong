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
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [isDone, setIsDone] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(0);

  // 유저 관련 변수들
  const userInfos = location.state?.userInfos;
  const [players, setPlayers] = useState<EnhancedUserInfo[]>(userInfos.map((user: UserInfo) => ({
    ...user,
    correctCount: 0,
    alert: ''
  })));


const handleClick = (option:any) => {
  if (selectedOptions.has(option)) {
    return; // 선택된 옵션이면 아무 일도 일어나지 않음
  } else {
    setSelectedOptions(new Set([...selectedOptions, option]));
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
}

// 웹소켓 연결 유지
useEffect(() => {
  connect();
}, [connect]);

// 모든 문제가 선택되었나?
useEffect(() => {
  if (selectedOptions.size >= 4) {
    setIsDone(true);
  }
}, [selectedOptions]);

// 방 삭제 함수
const deleteRoom = async () => {
  try {
    await fetch(`http://localhost:8080/api/room/${partyId}`, {
      method: 'DELETE'
    });
    navigate('/home'); // 삭제 후 홈으로 리다이렉트
  } catch (error) {
    console.error('Failed to delete room:', error);
  }
};

// isDone이 true이거나 count가 0이면 quiz 데이터 및 관련변수 초기화(다음 레벨)
useEffect(() => {
  if (isDone || count === 0) {
    setCount(10); // 시간을 다시 설정
    setPlayers(players.map(player => ({ ...player, correctCount: 0, alert: '' }))); // 플레이어 정보 초기화
    setIsDone(false); // isDone 상태 초기화
    setLevel(prevLevel => prevLevel + 1); // 레벨 증가

    if (quizList) {
      // 무작위 퀴즈 선택
      const randomIndex = Math.floor(Math.random() * quizList.length);
      const selectedQuiz = quizList[randomIndex];
      setQuiz(selectedQuiz);

      // 선택된 퀴즈를 제외한 나머지 퀴즈를 quizList 상태에 저장
      const newQuizList = quizList.filter((_, index) => index !== randomIndex);
      setQuizList(newQuizList);
  };
}
}, [isDone, count]);

// 퀴즈 결과 페이지로 이동
useEffect(() => {
  if (level >= 10) {
    if (client) {
      client.publish({
        destination: `/app/party/result`,
        body: ''
      });
  };
}
})

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
      if (data.type === 'correct' || data.type === 'wrong') {
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
      else if (data.type === 'result') {
        navigate(`/jeju-play/speed/${partyId}/result`)
      }
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
        // 무작위 퀴즈 선택
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedQuiz = data[randomIndex];
        setQuiz(selectedQuiz);

        // 선택된 퀴즈를 제외한 나머지 퀴즈를 quizList 상태에 저장
        const newQuizList = data.filter((_:any, index:number) => index !== randomIndex);
        setQuizList(newQuizList);
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