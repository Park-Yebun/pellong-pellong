import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton'
import speedquizicon from '../../assets/JejuPlay/speedquizicon.png'
import open from '../../assets/JejuPlay/open.png'
import lock from '../../assets/JejuPlay/lock.png'
import occupancy from '../../assets/JejuPlay/occupancy.png'
import close from '../../assets/JejuPlay/close.png'
import './PlayMainPage.css'

const PlayMainPage = () => {
  const [roomData, setRoomData] = useState<any[]>([]);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room|null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement|null>(null);
  const navigate = useNavigate();

  interface Room {
    partyId: number;
    partyName: string;
    kind: number;
    po: number;
    to: number;
    isPublic: boolean;
    password: string;
    memberNickname: string;
    memberProfileImg: string;
  }
  const handleClick = (room: Room) => {
    setSelectedRoom(room);
    // 방을 찾을 때 직접적인 인덱스 접근 대신 필터링 사용
    const selectedRoomData = roomData.find(r => r.partyId === room.partyId);
    if (selectedRoomData.po === selectedRoomData.to) {
      window.alert("정원이 다 찼습니다.")
    } else {
      // 찾은 방의 공개 여부 확인
      if (selectedRoomData && !selectedRoomData.isPublic) {
          setPasswordModalOpen(true);
      } else {
          navigate(`/jeju-play/${room.partyId}/wait`);
      };
    }
};
   
  const submitPassword = () => {
    const enteredPassword = passwordRef.current?.value;
    if (selectedRoom && selectedRoom.password === enteredPassword) {
      navigate(`/jeju-play/${selectedRoom.partyId}/wait`);
    } else {
      setIsWrong(true)
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/party', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          // credentials: 'include'
        });
        const data = await response.json();
        setRoomData(data);
        console.log('데이터 로드 성공')
      } catch (error) {
        console.log('데이터 로드 실패', error) 
      }
    }
    fetchData()
  }, []);

  const createRoom = (partyKind:number) => {
    navigate( '/jeju-play/create', { 
      state: {
        kind: partyKind
      }})
  };

  return (
    <div className='play-main-container'>
      <BackButton />
      <div className='play title'>플레이</div>
        <div className='play-btn-container'>
            <div className='speed-quiz-btn' onClick={() => createRoom(1)}>
                <div>사투리 스피드 퀴즈</div>
                <img className='speed-quiz-icon' src={speedquizicon} alt="speedquizicon" />
            </div>
            <div className='btn-group'>
              <div className='drama-quiz-btn' onClick={() => createRoom(3)}>드라마 대사 퀴즈</div>
              <div className='music-quiz-btn' onClick={() => createRoom(2)}>노래 가사 퀴즈</div>
            </div>
        </div>
        <div className='waitroom title'>대기방</div>
        {roomData.map((room:Room, index:number) => 
          <div key={index} className='waitiroom-container' onClick={() => handleClick(room)}
          style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'1.19rem'}}>
            <img className='profile' src={room.memberProfileImg} alt="profile" />
            <div className='party-title'>
              <div className='party-type'>
              {room.kind === 1 ? '스피드 퀴즈' : room.kind === 2 ? '노래 가사 퀴즈' : '영화/드라마 대사 퀴즈'}
              </div>
              <div className='party-occupancy' style={{display:'flex', justifyContent:'space-between'}}>
                <div>{room.partyName}</div>
                <div className='current-occupancy'>
                  <img src={occupancy} alt="occupancy" />
                  {room.po}/{room.to}
                </div>
              </div>
            </div>
            <img className='isPublic' src={room.isPublic ? open : lock} alt="isPublic" />
          </div>
        )}
        {passwordModalOpen && (
          <div className='password-modal'>
            <img className='close' src={close} alt="closebtn" onClick={() => {setPasswordModalOpen(false);}}/>
            <div className='password-txt'>비밀번호를 입력하세요.</div>
            {isWrong && (
              <div className='isWrong'>잘못된 비밀번호입니다.</div>
            )}
            <input className='password' type="password" maxLength={4} ref={passwordRef}/>
            <div className='submitbtn' onClick={() => submitPassword()}>확인</div>
          </div>
        )}
    </div>
  );
};

export default PlayMainPage;
