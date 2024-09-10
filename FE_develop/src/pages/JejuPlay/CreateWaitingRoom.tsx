import { useState, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ErrorBoundary, useErrorBoundary, FallbackProps } from "react-error-boundary";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
import { error } from 'console';

const CreateWaitingRoom = () => {
  const navigate = useNavigate();
  const store = useStore();
  const location = useLocation();
  const { showBoundary } = useErrorBoundary();
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
      po: 0,
      to: selectedCapacity,
      isPublic: null,
    };
  
    axios.post(`http://localhost:8080/party/create/${store.loginUserInfo?.memberId}`, bodyData, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      navigate(`/jeju-play/${response.data.partyId}/wait`);
    })
    .catch((error) => {
      toast.error('요청에 실패했습니다.');
    })
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
        <ToastContainer/>
    </Container>
  );
};

export default CreateWaitingRoom;
