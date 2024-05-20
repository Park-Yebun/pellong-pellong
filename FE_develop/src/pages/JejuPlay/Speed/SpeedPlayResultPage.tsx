import React from 'react';
import { Link } from 'react-router-dom';
import first from '../../../assets/JejuPlay/1st.png'
import second from '../../../assets/JejuPlay/2nd.png'
import third from '../../../assets/JejuPlay/3rd.png'
import fourth from '../../../assets/JejuPlay/4th.png'

import {
  Container,
  ExpBadge,
  Player,
  PlayerBox,
  ProfileBox,
  ProfileImg,
  Result,
  Trophy,
  Nickname,
  BackBtn
} from './SpeedPlayResultPage.styled'

const SpeedPlayResultPage = () => {
  return (
    <Container>
      <Result>게임 결과</Result>
      <PlayerBox>
        <Player>
          <Trophy src={first} alt='first-prize'></Trophy>
          <ProfileBox>
            <ExpBadge>+ 30exp</ExpBadge>
            <ProfileImg></ProfileImg>
            <Nickname>예분</Nickname>
          </ProfileBox>
        </Player>
        <Player>
          <Trophy src={first} alt='first-prize'></Trophy>
          <ProfileBox>
            <ExpBadge>+ 30exp</ExpBadge>
            <ProfileImg></ProfileImg>
            <Nickname>예분</Nickname>
          </ProfileBox>
        </Player>
        <Player>
          <Trophy src={first} alt='first-prize'></Trophy>
          <ProfileBox>
            <ExpBadge>+ 30exp</ExpBadge>
            <ProfileImg></ProfileImg>
            <Nickname>예분</Nickname>
          </ProfileBox>
        </Player>
        <Player>
          <Trophy src={first} alt='first-prize'></Trophy>
          <ProfileBox>
            <ExpBadge>+ 30exp</ExpBadge>
            <ProfileImg></ProfileImg>
            <Nickname>예분</Nickname>
          </ProfileBox>
        </Player>
      </PlayerBox>
      <BackBtn>대기실로 돌아가기</BackBtn>
    </Container>
  );
};

export default SpeedPlayResultPage;