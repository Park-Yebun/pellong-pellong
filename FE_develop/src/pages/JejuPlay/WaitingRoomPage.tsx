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
  const roomType = roomData?.kind === 1? "speed" : "other"
  const isOwner  = roomData?.hostId === store.loginUserInfo?.memberId;
  const isReady = roomData?.po === roomData?.to;


  // 게임 시작 함수
  const startGame = (event:any) => {
    if (!isOwner) {
      event.preventDefault();
      console.log("퀴즈 시작 권한이 없습니다.") //추후 alert나 모달로 구현할 것
    } else {
      if (!isReady) {
        console.log("인원이 준비되지 않았습니다.") //추후 alert나 모달로 구현할 것
      } else {
        client.send(`/app/party/${partyId}/start`, {}, '');
      }}
  };

  // 클라이언트 할당
  const socket = new SockJS('http:/localhost:8080/ws');
  let client = Stomp.over(socket);

  useEffect(() => {
    // 소켓 연결
    client.connect({}, () => {
      console.log("웹소켓이 연결되었습니다.")

      // 구독 요청
      client.subscribe("/topic/party/" + partyId, function(message){
        const data = JSON.parse(message.body);
        console.log("구독 요청 후 응답 데이터!!", data);
        // 1. 파티 디테일 정보를 받아올 경우 데이터 업데이트
        if (data.type === "updateData") {setRoomData(data.partyDetail)}

        // 2. 게임 시작 메세지를 받을 경우
        else if (data.type === "startGame") {
          navigate(`/jeju-play/${roomType}/${partyId}`)
        };
    });
    // 구독 요청 완료후에
    // 클라이언트 > 서버 메세지 보내기(참여자 입장요청)
    client.send(`/app/party/guest`, {},JSON.stringify({partyId: partyId, memberId: store.loginUserInfo?.memberId}));
  });

    return () => {
      console.log("언마운트됨")
      // 클라이언트 > 서버 메세지 보내기(참여자 퇴장요청)
      try{
        client.send(`/app/party/guest/delete`, {},JSON.stringify({partyId: partyId, memberId: store.loginUserInfo?.memberId}));
        console.log("퇴장 메세지를 전송했습니다.", store.loginUserInfo?.memberId);
      } catch (error) {
        console.error("메세지 전송 중 오류가 발생했습니다:", error);
      }

      setTimeout(() => {
        client.disconnect(() => {
          console.log("웹소켓 연결이 해제되었습니다.");
        });
      }, 500); // 연결 해제를 500ms 지연
    };
  }, []);

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
      <StartBtn onClick={(e) => startGame(e)}>퀴즈 시작</StartBtn>
    </Container>
  );
};

export default WaitingRoomPage;
