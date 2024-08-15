import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useWebsocket from '../../../contexts/useWebsocket';

import first from "../../../assets/JejuPlay/1st.png"
import second from "../../../assets/JejuPlay/3rd.png"
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
  const navigate = useNavigate();
  const { partyId } = useParams();
  
  // 유저 관련 변수들
  const gameResult = location.state?.gameResult;
  const sortedPlayers = useMemo(() => {
    return [...gameResult].sort((a, b) => b.correctcnt - a.correctcnt);
  }, [gameResult]);

  // 웹소켓
  const { connect, connected, disconnect, client } = useWebsocket();


  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (connected && client) {
      console.log("구독 요청을 보냅니다.")
      const subscription = client.subscribe('/topic/party/' + partyId, (message) => {
        const data = JSON.parse(message.body);
        console.log('구독 요청 후 응답 데이터!!', data);

        // 1. 대기방 삭제 완료 후 메인 페이지 이동
        if (data.type === 'delete') {
          navigate('/jeju-play')
        }

        // 2. 대기방 삭제 에러 반환
        else if (data.type === 'deleteError') {
          console.log("해당 파티가 존재하지 않습니다.")
        }
      });

      return () => {
        subscription.unsubscribe();
        console.log("구독을 해제합니다.")
      };
    }
  }, [connected]);


  // 경험치 적립
  useEffect(() => {
    const EarnExp = async () => {
      try {
        const result = sortedPlayers.map((player, index) => {
          return {
            playerId: player.guestId,
            playerExp: index === 0 ? 20 : 5
          };
        });
        const response = await fetch('http://localhost:8080/exp/speed-game', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result)
        });
        console.log("경험치 적립 성공", response)
      } catch (error) {
        console.log("경험치 적립 실패", error)
      }
    }
    EarnExp();
  }, [sortedPlayers]);

  const handleBackButtonClick = () => {
    if (client) {
      client.publish({
        destination: `/app/party/delete/${partyId}`,
        body: ''
      });
    }
  };

  return (
    <Container>
      <Result>게임 결과</Result>
      <PlayerBox>
        {sortedPlayers.length > 0 && (
          <>
          <Player>
            <Trophy src={first}></Trophy>
            <ProfileBox>
              <ExpBadge>+ 20exp</ExpBadge>
              <ProfileImg src={sortedPlayers[0].profileImg}></ProfileImg>
              <Nickname>{sortedPlayers[0].nickname}</Nickname>
            </ProfileBox>
          </Player>
          <Player>
          <Trophy src={first}></Trophy>
          <ProfileBox>
            <ExpBadge>+ 20exp</ExpBadge>
            <ProfileImg src={sortedPlayers[0].profileImg}></ProfileImg>
            <Nickname>{sortedPlayers[0].nickname}</Nickname>
          </ProfileBox>
        </Player>
        </>
        )}
        {sortedPlayers.length > 1 && (
          <Player>
            <Trophy src={second} style={
              { width: '80px', height: '100px', paddingLeft: '11px', paddingTop: '20px' }
              }></Trophy>
            <ProfileBox>
              <ExpBadge>+ 5exp</ExpBadge>
              <ProfileImg src={sortedPlayers[1].profileImg}></ProfileImg>
              <Nickname>{sortedPlayers[1].nickname}</Nickname>
            </ProfileBox>
          </Player>
        )}
      </PlayerBox>
      <BackBtn onClick={handleBackButtonClick}>대기실로 돌아가기</BackBtn>
    </Container>
  );
};

export default OtherPlayResultPage;