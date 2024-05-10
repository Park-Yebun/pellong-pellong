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
    // 한 유저당 한 파티만 만들 수 있어서 자꾸 에러코드 나길래 잠시 막아뒀어요

    // try {
    //   const memberId = 9
    //   const response = await fetch(`https://www.saturituri.com/api/party/create/${memberId}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bodyData)
    //   });
    //   console.log(response);
    //   const partyId = await response.json();
    //   navigate(`/jeju-play/${partyId}/wait`);
    // } catch (error) {
    //   console.log(bodyData);
    //   console.log(error);
    // }
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