import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import moviebadge from '../../../assets/JejuPlay/moviebadge.png'
import stageboard from '../../../assets/JejuPlay/stageboard.png'
import mardarin from '../../../assets/JejuPlay/mandarin.png'
import dummydata from '../../../data/drama';
import lifeImg from '../../../assets/JejuPlay/life.png'
import deLifeImg from '../../../assets/JejuPlay/loselife.png'

import {
  Container,
  Answer,
  AnswerBox,
  Content,
  Hint,
  MandarinBadge,
  QuizBox,
  Stage,
  StageBox,
  TypeBadge,
  StageText,
  Alert,
  PlayerBox,
  Player,
  Life,
  LifeBox,
  Nickname,
  ProfileImg
} from './OtherPlayPage.styled'


const OtherPlayPage = () => {
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<Quiz|null>(null);
  const [stage, setStage] = useState<number>(1)
  const answerRef = useRef<HTMLInputElement|null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const { partyId } = useParams();
  const location = useLocation();
  const [kind, setKind] = useState<number>(location.state?.kind);

  interface Quiz {
    readonly dramaId: number,
    content: string,
    title: string
  }

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

   // 유저 관련 변수들
   const userInfos = location.state?.userInfos;
   // 입력 필드에 답을 제출한 가장 최근 플레이어
   const [currentUser, setCurrentUser] = useState<EnhancedUserInfo | null>(null);
   const [players, setPlayers] = useState<EnhancedUserInfo[]>(userInfos.map((user: UserInfo) => ({
     ...user,
     correctCount: 0,
     validLifeCount: Math.min(3, Math.max(0, 3)),
     alert: ''
   })));

  const selectRandomQuiz = () => {
    if (dummydata.length > 0) {
      const randomIndex = Math.floor(Math.random() * dummydata.length);
      return dummydata[randomIndex];
    }
    return null;
  };

  // 입력창에 접근할때 유저 정보를 변수에 저장
  const handleFocus = (user: EnhancedUserInfo | null) => {
    if (user) {
      setCurrentUser(user);
      console.log("답을 입력한 유저 : " + user)
    }
  };

  const checkAnswer = useCallback((answer:string|undefined,  user: EnhancedUserInfo | null) => {
    console.log('함수 정상 작동!!', answer)
    if (user && answer && answer === quiz?.title) {
      // 정답 맞았을때 로직
      setStage(prevStage => prevStage + 1)
      if (answerRef.current) {answerRef.current.value = "";}
      setQuizList(quizList.filter(quiz => quiz.dramaId !== quiz.dramaId));
      setQuiz(selectRandomQuiz());

      // 현재 플레이어 correctCount 증가
      setPlayers(players.map((player) => {
        if (player.guestId === user.guestId) {
          return { ...player, correctCount: player.correctCount + 1, alert: '정답!' };
        }
        return player;
      }));

      // alert 상태 초기화
      setTimeout(() => {
        setPlayers((prevPlayers) => prevPlayers.map((player) => {
          if (player.guestId === user.guestId) {
            return { ...player, alert: '' };
          }
          return player;
        }));
      }, 1000);

    // 틀렸을때 로직
    } else if (user && answer && answer !== quiz?.title) {
      console.log("틀렸음")
      if (answerRef.current) {answerRef.current.value = "";}

      // life 감소
      setPlayers((prevPlayers) => prevPlayers.map((player) => {
        if (player.guestId === user.guestId) {
          return { ...player, alert: '오답!', validLifeCount: player.validLifeCount - 1 };
        }
        return player;
      }));

      // alert 상태 초기화
      setTimeout(() => {
        setPlayers((prevPlayers) => prevPlayers.map((player) => {
          if (player.guestId === user.guestId) {
            return { ...player, alert: '' };
          }
          return player;
        }));
      }, 1000);

    } else {
      // 제출한 답이 ''이거나 null일때 로직
      if (answerRef.current) {answerRef.current.value = "";}
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = '';
        if (kind === 2) {
          apiUrl = 'https://www.saturituri.com/api/kpop';
        } else if (kind === 3) {
          apiUrl = 'https://www.saturituri.com/api/drama';
        } 
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = response
        // const data = await response.json();
        // setQuizList(data);
        setQuiz(selectRandomQuiz());
        console.log('데이터 로드 성공', data);
      } catch (error) {
        console.log('데이터 로드 실패', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <StageBox>
        <Stage src={stageboard} alt='stageboard'></Stage>
        <StageText>{stage}</StageText>
      </StageBox>
      <QuizBox>
        <TypeBadge src={moviebadge} alt='moviebadge'></TypeBadge>
        <Content>{quiz?.content}</Content>
      </QuizBox>
      {/* {to == 1 && (
        <SoloUser alert={alert} lifeCnt={lifeCnt}/>
      )}
      {to == 2 && (
        <DuelUser/>
      )} */}
      <PlayerBox>
        {players.map((player) => (
          <Player key={player.guestId}>
              <Alert>{player.alert}</Alert>
              <ProfileImg src={player.profileImg} alt="profile"></ProfileImg>
              <Nickname>골개비</Nickname>
              <LifeBox>
                {[...Array(player.validLifeCount)].map((_, index) => (
                    <Life key={index} src={lifeImg} alt="life"></Life>
                ))}
                {[...Array(3-player.validLifeCount)].map((_, index) => (
                    <Life key={index} src={deLifeImg} alt="delife"></Life>
                ))}
              </LifeBox>
              <AnswerBox>
                <MandarinBadge src={mardarin} alt='mandarin'></MandarinBadge>
                <Answer ref={answerRef} placeholder='제목을 입력하세요.' 
                onKeyUp={(e) => {if(e.key === 'Enter') {checkAnswer(answerRef.current?.value, player)}}}></Answer>
            </AnswerBox>
          </Player>
        ))}
        </PlayerBox>
    </Container>
  );
};

export default OtherPlayPage;
