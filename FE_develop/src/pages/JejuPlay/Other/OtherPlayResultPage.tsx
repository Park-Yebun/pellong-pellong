import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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

interface UserInfo {
  guestId: number;
  nickname: string;
  profileImg: string;
  memberId: number;
}

interface EnhancedUserInfo extends UserInfo {
  correctCount: number;
  validLifeCount: number;
  alert: string;
}

const OtherPlayResultPage = () => {
  const location = useLocation();
  
  // 유저 관련 변수들
  const gameResult = location.state?.gameResult;

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

export default OtherPlayResultPage;