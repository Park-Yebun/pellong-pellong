import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton'
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
import { Interface } from 'readline';

interface Room {
  readonly partyId: number,
  partyName: string,
  kind: number,
  po: number,
  to: number,
  isPublic: boolean,
  memberNickname: string,
  memberProfileImg: string,
  guests: any
}

const WaitingRoomPage = () => {
  const [roomData, setRoomData] = useState<Room|undefined>();
  const { partyId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.saturituri.com/api/party/${partyId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        // console.log(data)
        setRoomData(data);
        console.log('데이터 로드 성공', data)
      } catch (error) {
        console.log('데이터 로드 실패', error) 
      }
    }
    fetchData()
  }, []);
  return (
    <Container>
      <UpperBox>
        <BackButton/>
        <SubTextBox>PLAY !!</SubTextBox>
        <MainTextBox>인원이 모이면 퀴즈를 시작해요</MainTextBox>
      </UpperBox>
      <PlayerContainer>
        <Player>
          <ProfileImg src={roomData?.memberProfileImg}></ProfileImg>
          <Nickname>{roomData?.memberNickname}</Nickname>
        </Player>
        {roomData ? [...Array(Math.max(0, roomData.to - 1))].map((_, index) => (
          <Player key={index}>
            <ProfileImg/>
            <Nickname></Nickname>
          </Player>
        )) : <p>방 정보를 불러오는 중...</p>}
      </PlayerContainer>
      <StartBtn>퀴즈 시작</StartBtn>
    </Container>
  );
};

export default WaitingRoomPage;