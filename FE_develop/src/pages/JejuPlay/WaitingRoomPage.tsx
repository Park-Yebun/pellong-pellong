import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton'
import useStore from '../../store' 
import {
  Container,
  MainTextBox,
  Player,
  PlayerContainer,
  StartBtn,
  SubTextBox,
  UpperBox,
  Nickname,
  ProfileImg
} from './WaitingRoomPage.styled'
import { Interface }
 from 'readline';

// 웹소켓 통신
import SockJS from 'sockjs-client';
import {Stomp, Frame} from '@stomp/stompjs';

interface Room {
  readonly partyId: number,
  partyName: string,
  kind: number,
  po: number,
  to: number,
  isPublic: boolean,
  hostId: number,
  guests: any
}

interface Guest {
  readonly guestId: number,
  nickname: string,
  profileImg: string
}

const WaitingRoomPage = () => {
  const [roomData, setRoomData] = useState<Room|undefined>();
  const { partyId } = useParams();
  const store = useStore();
  const navigate = useNavigate();
  const isOwner  = roomData?.hostId === store.loginUserInfo?.memberId;
  const isReady = roomData?.po === roomData?.to;

  // const startGame = (event: any) => {
  //   console.log("내가 방장이니?",isOwner)
  //   if (client && client.connected) {
  //   client.send(`/app/party/${partyId}/start`, {}, JSON.stringify({partyType: "speed"}));
  //   } else {
  //     console.log("웹소켓 연결이 끊어져서 게임 시작 못함")
  //     const socket = new SockJS('http://localhost:8080/ws');
  //     let client = Stomp.over(socket);
  //     client.connect({}, () => {
  //       client.subscribe("/topic/party/" + partyId, function(message){
  //         if (message.body === "other") {
  //           navigate('/jeju-play/other/' + partyId);
  //         } else if (message.body === "speed") {
  //           navigate('/jeju-play/speed/' + partyId);
  //         }
  //       });
  //     })
  //   }
  //   if (!isOwner) {
  //     event.preventDefault();
  //     console.log("퀴즈 시작 권한이 없습니다.") //추후 alert나 모달로 구현할 것
  //   } else {
  //     if (!isReady) {
  //       console.log("인원이 준비되지 않았습니다.") //추후 alert나 모달로 구현할 것
  //     } else if (isReady && roomData?.kind === 2 || roomData?.kind === 3) {
  //       client.send(`/app/party/${partyId}/start`, {}, JSON.stringify({partyType: "other"}));
  //     } else if (isReady && roomData?.kind === 1) {
  //       client.send(`/app/party/${partyId}/start`, {}, JSON.stringify({partyType: "speed"}));
  //   };};
  // }

  // 클라이언트 할당
  const socket = new SockJS('wss://www.saturituri.com/ws');
  let client = Stomp.over(socket);

  useEffect(() => {
    // 소켓 연결
    client.connect({}, () => {
      console.log("웹소켓이 연결되었습니다.")
      console.log("방번호", partyId)

      // 구독 요청
      client.subscribe("/topic/party/" + partyId, function(message){
        const data = JSON.parse(message.body);
        console.log("구독 요청 후 응답 데이터!!", data);
        if (message.body === "other") {
          navigate('/jeju-play/other/' + partyId);
        } else if (message.body === "speed") {
          navigate('/jeju-play/speed/' + partyId);
        }
        setRoomData(data);
      });
      // 클라이언트 > 서버 메세지 보내기(참여자 입장요청)
      console.log("로그인 유저: ", store.loginUserInfo?.memberId)
      client.send(`/app/party/guest`, {},JSON.stringify({partyId: partyId, memberId: store.loginUserInfo?.memberId}));
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

  return (
    <Container>
      <UpperBox>
        <BackButton/>
        <SubTextBox>PLAY !!</SubTextBox>
        <MainTextBox>인원이 모이면 퀴즈를 시작해요</MainTextBox>
      </UpperBox>
      <PlayerContainer>
      {roomData && Array.from({ length: roomData.to }, (_, index) => (
        <Player key={index}>
          {roomData.guests[index] ? (
            <>
              <ProfileImg src={roomData.guests[index].profileImg} />
              <Nickname>{roomData.guests[index].nickname}</Nickname>
            </>
          ) : (
            <>
            <ProfileImg/>
            <Nickname></Nickname>
            </>
          )}
        </Player>
      ))}
      </PlayerContainer>
      {/* <StartBtn onClick={(e) => startGame(e)}>퀴즈 시작</StartBtn> */}
    </Container>
  );
};

export default WaitingRoomPage;
