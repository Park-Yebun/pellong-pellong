import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../../store';
import useWebsocket from '../../contexts/useWebsocket';

import {
  Container,
  MainTextBox,
  Player,
  PlayerContainer,
  StartBtn,
  SubTextBox,
  UpperBox,
  Nickname,
  ProfileImg,
  BackBtn
} from './WaitingRoomPage.styled';

interface Room {
  readonly partyId: number;
  partyName: string;
  kind: number;
  po: number;
  to: number;
  isPublic: boolean;
  hostId: number;
  guests: any;
}

const WaitingRoomPage = () => {
  const [roomData, setRoomData] = useState<Room | undefined>();
  const { partyId } = useParams();
  const store = useStore();
  const { connected, connect, disconnect, client } = useWebsocket();
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState<string | null>(null);
  const isOwner = roomData?.hostId === store.loginUserInfo?.memberId;
  const isReady = roomData?.po === roomData?.to;
  // const isOwenerOut = roomData?.guests
  const isEmpty = roomData?.po === 0 ? true : false;

  const startGame = (event:any) => {
    // const numPartyId = Number(partyId)
    // if (client) {
    //   client.publish({
    //     destination: `/app/party/${numPartyId}/start`,
    //     body: ''
    //   });
    // }
    if (!isOwner) {
      event.preventDefault();
      console.log("퀴즈 시작 권한이 없습니다.") //추후 alert나 모달로 구현할 것
    } else {
      if (!isReady && client) {
        console.log("인원이 준비되지 않았습니다.") //추후 alert나 모달로 구현할 것
      } else if (isReady && client) {
        const numPartyId = Number(partyId)
        client.publish({
          destination: `/app/party/${numPartyId}/start`,
          body: ''
        });
      }}
  };

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (connected && client) {
      console.log("구독 요청을 보냅니다.");
      const numPartyId = Number(partyId)
      const subscription = client.subscribe(`/topic/party/` + numPartyId, (message) => {
        const data = JSON.parse(message.body);
        console.log('구독 요청 후 응답 데이터!!', data);

        // 1. 파티 디테일 정보를 받아올 경우 데이터 업데이트
        if (data.type === "updateData") {
          setRoomData(data.partyDetail);
          setRoomType(data.partyDetail.kind === 1 ? 'speed' : 'other');
        }
        
        // 2. 게임 시작 메세지를 받을 경우
        else if (data.type === "startGame") {
          navigate(`/jeju-play/${roomType}/${partyId}`, { 
            state: {
              userInfos: roomData?.guests
            }})
        };
      });

      client.publish({
        destination: '/app/party/guest/' + numPartyId,
        body: JSON.stringify({partyId: numPartyId, memberId: store.loginUserInfo?.memberId})
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [connected, roomType]);

  const handleBackButtonClick = () => {
    if (client) {
      const numPartyId = Number(partyId)
      client.publish({
        destination: '/app/party/guest/delete',
        body: JSON.stringify({partyId: numPartyId, memberId: store.loginUserInfo?.memberId})
      });
    }
    navigate('/'); // 뒤로가기
  };

  return (
    <Container>
      <UpperBox>
        <BackBtn onClick={handleBackButtonClick}></BackBtn>
        <SubTextBox>PLAY !!</SubTextBox>
        <MainTextBox>인원이 모이면 퀴즈를 시작해요</MainTextBox>
      </UpperBox>
      <PlayerContainer>
        {roomData &&
          Array.from({ length: roomData.to }, (_, index) => (
            <Player key={index}>
              {roomData.guests[index] ? (
                <>
                  <ProfileImg src={roomData.guests[index].profileImg} />
                  <Nickname>{roomData.guests[index].nickname}</Nickname>
                </>
              ) : (
                <>
                  <ProfileImg />
                  <Nickname></Nickname>
                </>
              )}
            </Player>
          ))}
      </PlayerContainer>
      <StartBtn onClick={startGame}>퀴즈 시작</StartBtn>
    </Container>
  );
};

export default WaitingRoomPage;
