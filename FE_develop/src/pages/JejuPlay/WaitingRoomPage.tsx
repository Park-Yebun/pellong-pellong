import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  memberNickname: string,
  memberProfileImg: string,
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

  // 클라이언트 할당
  const socket = new SockJS('http://localhost:8080/ws');
  let client = Stomp.over(socket);

  useEffect(() => {
    // 소켓 연결
    client.connect({}, () => {
      console.log("웹소켓이 연결되었습니다.")

      // 구독 요청
      client.subscribe("/topic/party/" + partyId, function(message){
        const response = JSON.parse(message.body)
        // console.log("구독 요청 후 응답 데이터!!", response)
      });
      // 클라이언트 > 서버 메세지 보내기(참여자 추가요청)
      client.send(`/app/party/guest`, {},JSON.stringify({partyId: partyId, memberId: store.loginUserInfo?.memberId}));
    })
    return () => client.disconnect(() => {
      console.log("웹소켓 연결이 해제되었습니다.")
    });
  }, [client, partyId]);
    
  useEffect(() => {
    const fetchData = async () => {
      let roomNum : number;
      if( partyId && typeof partyId == "string" ){
          roomNum = parseInt(partyId);
      }else{ roomNum = 0; };
      try {
        const response = await fetch(`https://www.saturituri.com/party/${partyId}`, {
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
        {/* <Player>
          <ProfileImg src={roomData?.memberProfileImg}></ProfileImg>
          <Nickname>{roomData?.memberNickname}</Nickname>
        </Player> */}
        {roomData && (roomData.guests.map((guest:Guest, index:number) => 
          <Player key={index}>
            <ProfileImg src={guest.profileImg}/>
            <Nickname>{guest.nickname}</Nickname>
          </Player>
        ))}
      </PlayerContainer>
      <StartBtn>퀴즈 시작</StartBtn>
    </Container>
  );
};

export default WaitingRoomPage;


