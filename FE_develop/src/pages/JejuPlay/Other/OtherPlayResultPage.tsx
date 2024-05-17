import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  ExpBadge,
  Player,
  PlayerBox,
  ProfileBox,
  ProfileImg,
  Result,
  Trophy,
  Nickname
} from './OtherPlayResultPage.styled'

const PlayResultPage = () => {
  return (
    <Container>
      <Result>게임 결과</Result>
      <PlayerBox>
        <Player>
          <Trophy></Trophy>
          <ProfileBox>
            <ExpBadge>+ 30exp</ExpBadge>
            <ProfileImg></ProfileImg>
            <Nickname>예분</Nickname>
          </ProfileBox>
        </Player>
      </PlayerBox>
    </Container>
  );
};

export default PlayResultPage;