import React, { useMemo, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useErrorBoundary } from "react-error-boundary";
import trophy from '../../assets/JejuPlay/Trophy Cup.png'
import lose from '../../assets/JejuPlay/lose.png'
import useWebsocket from '../../contexts/useWebsocket';
import {
  Container,
  Exp,
  GameOver,
  Lose,
  Loser,
  Nickname,
  ProfileBox,
  ProfileImg,
  Trophy,
  Winner,
 } from './GameOverPage.styled'
import axios from 'axios';
import { error } from 'console';

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

const GameOverPage = () => {
  const { showBoundary } = useErrorBoundary();
  const location = useLocation();
  const navigate = useNavigate();

  const { partyId } = useParams();
  const gameResult = location.state?.gameResult;
  const sortedPlayers = useMemo(() => {
    return [...gameResult].sort((a, b) => b.validLifeCount - a.validLifeCount);
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

        if (data.type === 'delete') {
          setTimeout(() => {
            navigate('/jeju-play')
          }, 4000);
        }
      });

      return () => {
        subscription.unsubscribe();
        console.log("구독을 해제합니다.")
      };
    };
  }, [connected])

  // 경험치 적립
  useEffect(() => {
    const EarnExp = async () => {
      if (client) {
        if (sortedPlayers.length >= 2) {
          const result = [{
            playerId: sortedPlayers[0].guestId,
            playerExp: 15
          }]

          axios.patch('http://localhost:8080/exp/speed-game', result, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            console.log("경험치 적립 성공", response.data)
            client.publish({
              destination: `/app/party/delete/${partyId}`,
              body: ''
            });
          })
          .catch((error) => {
            showBoundary(error);
          })
        } else {
          console.log("게임오버")
          client.publish({
            destination: `/app/party/delete/${partyId}`,
            body: ''
          });
        }; 
      };
    }
    EarnExp();
  }, [sortedPlayers, connected]);


  return (
    <Container>
      <GameOver>게임 오버</GameOver>
      { sortedPlayers.length >= 2 && (
        <>
        <Trophy src={trophy}></Trophy>
        <Winner>
          <ProfileBox>
            <ProfileImg src={sortedPlayers[0].profileImg}></ProfileImg>
            <Nickname>{sortedPlayers[0].nickname}</Nickname>
            <Exp>+ 15exp</Exp>
          </ProfileBox>
        </Winner>
        </>
      )}
    
      <Loser>
        <ProfileBox>
          <Lose src={lose}></Lose>
          <ProfileImg src={ sortedPlayers[sortedPlayers.length-1].profileImg }></ProfileImg>
          <Nickname>{ sortedPlayers[sortedPlayers.length-1].nickname }</Nickname>
        </ProfileBox>
      </Loser>
    </Container>
  );
};

export default GameOverPage;