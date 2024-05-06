import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import speedquiz from '../../assets/JejuPlay/speedquiz.png'
import otherquiz from '../../assets/JejuPlay/otherquiz.png'
import close from '../../assets/JejuPlay/close.png'
import {
  Container,
  CreateBox,
  CloseBtn,
  SpeedQuizImg,
  OptionGroup,
  Text,
  Title,
  Capacity,
  Option,
  Password,
  IsPublic,
  CreateBtn,
  Slider,
  Switch
} from './CreateWaitingRoom.styled'
import { HtmlOptions } from 'istanbul-reports';

const CreateWaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [kind, setKind] = useState<string>(location.state?.kind);
  const [selectedCapacity, setSelectedCapacity] = useState<number|null>(null);
  const passwordRef = useRef<HTMLInputElement|null>(null);
  const titleRef = useRef<HTMLInputElement|null>(null);

  const handleCapacityChange = (event:any) => {
    setSelectedCapacity(event.target.value);
  }

  const createRoom = async () => {
    const bodyData = {
       password: passwordRef.current?.value,
       partyName: titleRef.current?.value,
       kind: kind,
       to: selectedCapacity,
       isPublic: isPublic,
       userId: 1
    }
    // try {
    //   const response = await fetch(``, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bodyData)
    //   });
    //   if (response.ok) {
    //     navigate(`/jeju-play/${response.partyId}/wait`);
    //   } else {
    //     console.log("대기방 생성 요청 실패");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Container>
        <CreateBox>
            <CloseBtn src={close} alt="closebtn" onClick={() => navigate(-1)}></CloseBtn>
            <SpeedQuizImg src={kind === 'speed' ? speedquiz : otherquiz} alt="speedquizimg"></SpeedQuizImg>
            <OptionGroup>
              <Text>방 제목</Text>
              <Title maxLength={32} ref={titleRef}></Title>
              <Text>최대 인원</Text>
              <Capacity value={Number(selectedCapacity)} onChange={handleCapacityChange}>
                {kind === 'speed' && (
                  <>
                  <Option value={4}>4</Option>
                  <Option value={6}>6</Option>
                  </>
                )}
                {kind !== 'speed' && (
                  <Option value={2}>2</Option>
                )}
              </Capacity>
              <Text>비밀 번호</Text>
              <Password type='password' maxLength={4} disabled={isPublic} ref={passwordRef}></Password>
              <Text>공개 여부</Text>
              <Switch>
                <IsPublic type='checkbox' defaultChecked={isPublic} onChange={() => setIsPublic(!isPublic)}></IsPublic>
                <Slider></Slider>
              </Switch>
            </OptionGroup>
        </CreateBox>
        <CreateBtn onClick={() => createRoom()}>만들기</CreateBtn>
    </Container>
  );
};

export default CreateWaitingRoom;