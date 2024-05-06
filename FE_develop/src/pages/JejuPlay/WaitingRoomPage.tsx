import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton'
import {
  Container,
  MainTextBox,
  Player,
  PlayerContainer,
  StartBtn,
  SubTextBox,
  UpperBox
} from './WaitingRoomPage.styled'

const WaitingRoomPage = () => {
  return (
    <Container>
      <UpperBox>
        <BackButton/>
        <SubTextBox>PLAY !!</SubTextBox>
        <MainTextBox>인원이 모이면 퀴즈를 시작해요</MainTextBox>
      </UpperBox>
      <PlayerContainer>
        <Player>
          
        </Player>
        <Player></Player>
        <Player></Player>
        <Player></Player>
      </PlayerContainer>
      <StartBtn>퀴즈 시작</StartBtn>
    </Container>
  );
};

export default WaitingRoomPage;