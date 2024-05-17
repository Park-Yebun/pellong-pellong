import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStore from '../../store';
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

const CreateWaitingRoom = () => {
  const navigate = useNavigate();
  const store = useStore();
  const location = useLocation();
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [kind, setKind] = useState<number>(location.state?.kind);
  const [selectedCapacity, setSelectedCapacity] = useState<number>(kind === 1 ? 4 : 2);
  const passwordRef = useRef<any|null>(null);
  const titleRef = useRef<HTMLInputElement|null>(null);

  const handleCapacityChange = (event:any) => {
    setSelectedCapacity(event.target.value);
  }

  const createRoom = async () => {
    const bodyData = {
      partyName: titleRef.current?.value,
      password: passwordRef.current?.value,
      kind: kind,
      po: 1,
      to: selectedCapacity,
      isPublic: isPublic,
    }

    try {
      const response = await fetch(`https://www.saturituri.com/api/party/create/${store.loginUserInfo?.memberId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
      });
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        navigate(`/jeju-play/${data.partyId}/wait`);
      } else {
        console.log("방은 한번만 만들수 있음")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
        <CreateBox>
            <CloseBtn src={close} alt="closebtn" onClick={() => navigate(-1)}></CloseBtn>
            <SpeedQuizImg src={kind === 1 ? speedquiz : otherquiz} alt="speedquizimg"></SpeedQuizImg>
            <OptionGroup>
              <Text>방 제목</Text>
              <Title maxLength={32} ref={titleRef}></Title>
              <Text>최대 인원</Text>
              <Capacity value={Number(selectedCapacity)} onChange={handleCapacityChange}>
                {kind === 1 && (
                  <>
                  <Option value={4}>4</Option>
                  <Option value={6}>6</Option>
                  </>
                )}
                {kind !== 1 && (
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
