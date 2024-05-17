import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import profileImg from '../../../assets/JejuPlay/profile.png'
import useStore from '../../../store';
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

// 웹소켓 통신
import SockJS from 'sockjs-client';
import {Stomp, Frame} from '@stomp/stompjs';

const SpeedPlayPage = () => {
const [count, setCount] = useState(10);
const [quizList, setQuizList] = useState<any[]>([]);
const [quiz, setQuiz] = useState<any|null>(null);
const { partyId } = useParams();
const navigate = useNavigate();
const store = useStore();

 // 클라이언트 할당
 const socket = new SockJS('https://www.saturituri.com/ws');
 let client = Stomp.over(socket);

 useEffect(() => {
   // 소켓 연결
   client.connect({}, () => {
     console.log("웹소켓이 연결되었습니다.")

     // 구독 요청
     client.subscribe("/topic/party/" + partyId, function(message){
       if (message.body === "유저가 퇴장했습니다.") {
        // 클라이언트 > 서버 메세지 보내기(참여자 입장요청)
        setTimeout(() => {
          client.send(`/app/party/guest`, {}, JSON.stringify({partyId: partyId, memberId: store.loginUserInfo?.memberId}));
        }, 500); // 500밀리초 후에 실행
       }
     });
     
   })
   return () => {
     // 클라이언트 > 서버 메세지 보내기(참여자 퇴장요청)
     try{
       client.send(`/app/party/guest/delete`, {},JSON.stringify({partyId: partyId, memberId: store.loginUserInfo?.memberId}));
       console.log("퇴장 메세지를 전송했습니다.", store.loginUserInfo?.memberId);
     } catch (error) {
       console.error("메세지 전송 중 오류가 발생했습니다:", error);
     }

     client.disconnect(() => {
       console.log("웹소켓 연결이 해제되었습니다.")
     });
   };
 }, [partyId]);

useEffect(() => {
  const id = setInterval(() => {
      setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0); 
  }, 1000);
  return () => clearInterval(id);
}, []);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://www.saturituri.com/dialect/speed/quiz', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       const data = await response.json();
//       setQuizList(data);
//       const randomIndex = Math.floor(Math.random() * 10);
//       setQuiz(quizList[randomIndex]);
//       console.log('데이터 로드 성공')
//     } catch (error) {
//       console.log('데이터 로드 실패', error)
//     }
//   }
//   fetchData()
// }, []);

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