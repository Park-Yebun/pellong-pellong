import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import '../../components/MyPage/UserProfile.css';
import useStore from '../../store';
import './MyPage.css'

import UserExplog from '../../pages/MyPage/UserExplogPage'
import UserRank from '../../components/MyPage/UserRank'
import UserBadge from '../../components/MyPage/UserBadge'
import BackButton from '../../components/BackButton';
import logoutImg from '../../assets/logout.png'
import {
  Container,
  Email,
  InfoBox,
  Nickname,
  UserProfile,
  UserProfileBox,
  ProfileImg,
  Logout,
  NicknameBox,
  RankBox,
  RankImg,
  RankText,
  ModalBackground, // 모달 배경 스타일 추가
  ModalContent, // 모달 내용 스타일 추가
  CloseButton // 모달 닫기 버튼 스타일 추가
} from './MyPage.styled'
 
interface User {
  email: string;
  nickname: string;
  profileImg: string;
  tier: string;
  myRank: number;
  sumExp: number;
  representativeBadgeId: number;
}

const MyPage: React.FC = () => {
  const store = useStore();
  const memberId = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User|null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가


  // badges 배열과 해당 상태를 업데이트할 함수 선언
  const [badges, setBadges] = useState([
    { id: 1, title: "팰롱팰롱", description: "✨팰롱팰롱에 혼저옵서예✨", imageUrl: "../../assets/badges/01pellongpellong.png", isAcquired: false },
    { id: 2, title: "퀘스트 탐험가", description: "데일리 퀘스트를 10개 이상 완료함", imageUrl: "../../assets/badges/02dailyquest.png", isAcquired: false },
    { id: 3, title: "종달새 학습자", description: "오전 5시 - 오전 9시 사이에 퀴즈 10개 완료함", imageUrl: "../../assets/badges/03earlybird.png", isAcquired: false },
    { id: 4, title: "올빼미 학습자", description: "오후 9시 - 오전 5시 사이에 퀴즈 10개 완료함", imageUrl: "../../assets/badges/04owl.png", isAcquired: false },
    { id: 5, title: "exp 메달리스트", description: "누적 경험치 10000 xp를 획득함", imageUrl: "../../assets/badges/b5.jpg", isAcquired: false },
    { id: 6, title: "무결점학습자", description: "만점 챕터 10개를 달성함", imageUrl: "../../assets/badges/b6.jpg", isAcquired: false },
    { id: 7, title: "랭커", description: "전체 랭킹 1위 ~ 10위를 달성함", imageUrl: "../../assets/badges/b7.jpg", isAcquired: false },
    { id: 8, title: "탐나는 도다", description: "제주도에 방문함", imageUrl: "../../assets/badges/b8.jpg", isAcquired: false },
    { id: 9, title: "사투리의 신", description: "위의 모든 뱃지를 획득함", imageUrl: "../../assets/badges/b8.jpg", isAcquired: false },
    // 추가 뱃지 데이터
  ]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    useStore.getState().setLoginUserInfo(undefined);
    // console.log("로그아웃되었습니다.") // 추후에 모달로 구현할 것
    navigate('/')
  }

  const getRankBadge = (sumExp: number) => {
    if (sumExp >= 0 && sumExp < 100) {
      return '../../assets/badge/small.png';
    }
    else if (sumExp >= 100 && sumExp < 300) {
      return '../../assets/badge/middle.png';
    }
    else if (sumExp >= 300 && sumExp < 500) {
      return '../../assets/badge/big.png';
    }
    else if (sumExp >= 500 && sumExp < 1000) {
      return '../../assets/badge/sobig.png';
    }
    else if (sumExp > 1000)
      return '../../assets/badge/brilliant.png';
  };

  useEffect(() => {
    // console.log("페치데이터 동작!!")
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.saturituri.com/api/profiles/' + store.loginUserInfo?.memberId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // console.log(response)
        const data = await response.json();
        setUserData(data);

        // 사용자가 획득한 뱃지의 ID 목록
        const acquiredBadgeIds = data.badgeArray.map((badge: { badgeId: number; acquired: boolean; }) => badge.badgeId);
  
        
        // badges 배열을 복사하여 업데이트
        const updatedBadges = badges.map(badge => ({
        ...badge,
        isAcquired: acquiredBadgeIds.includes(badge.id) // 해당 뱃지 ID가 획득한 뱃지 ID 목록에 포함되어 있는지 확인
        }));        

        // 업데이트된 뱃지 정보를 상태에 반영
        setBadges(updatedBadges);



        // console.log("뭐", acquiredBadgeIds)
        // console.log("데이터 로드 완료", response);
        // console.log(data);
      } catch (error) {
        // console.log("데이터 로드 실패", error)
      }
    }
    fetchData()
  },[]);


  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <Container>
      <BackButton />
      { userData && (
        <UserProfileBox>
          <UserProfile>
            <InfoBox>
              <ProfileImg src={userData?.profileImg} alt="Profile" style={{ width: 124, borderRadius: '50%' }} />
              <NicknameBox>
                <Nickname>{userData?.nickname}</Nickname>
              </NicknameBox>
              <RankBox>
                <RankImg>
                  <img src={getRankBadge(userData.sumExp)} alt="" style={{ width: 90, height: 90 }}/>
                </RankImg>
                <RankText>
                  <div> {userData.tier}</div>
                  <div> 순위 : {userData.myRank}</div>
                  <div> 누적 경험치 : {userData.sumExp}</div>
                </RankText>
              </RankBox>
            </InfoBox>
          </UserProfile>
          <button onClick={openModal} className='exp-button'>경험치 적립 내역</button>
          <UserBadge badges={badges} /> 
          {/* 모달 열기 버튼 */}
          <Logout src={logoutImg} alt='logout' onClick={() => logout()}/>
        </UserProfileBox>
      )}
      {/* 모달 조건부 렌더링 */}
      {isModalOpen && (
        <ModalBackground>
          <ModalContent>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
            <UserExplog/>
          </ModalContent>
        </ModalBackground>
      )}
    </Container>
  );
};

export default MyPage;