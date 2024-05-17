import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import '../../components/MyPage/UserProfile.css';
import useStore from '../../store';

import UserRank from '../../components/MyPage/UserRank'
import UserBadge from '../../components/MyPage/UserBadge'
import BackButton from '../../components/BackButton';
import logoutImg from '../../assets/logout.png'
import {
  EditBox,
  EditBtn,
  Container,
  Email,
  InfoBox,
  Nickname,
  UserProfile,
  UserProfileBox,
  ProfileImg,
  Logout,
  NicknameBox
} from './MyPage.styled'
 
interface User {
  email: string;
  nickname: string;
  profileImg: string;
  tier: string;
  rank: number;
  sumExp: number;
  representativeBadgeId: number;
}

const MyPage: React.FC = () => {
  const store = useStore();
  const memberId = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User|null>(null);

  const [badges] = useState([
    { id: 1, title: "팰롱팰롱", description: "✨팰롱팰롱에 혼저옵서예✨", imageUrl: "../../assets/badges/01pellongpellong.png" },
    { id: 2, title: "퀘스트 탐험가", description: "데일리 퀘스트를 XX개 완료함", imageUrl: "../../assets/badges/02dailyquest.png" },
    { id: 3, title: "종달새 학습자", description: "오전 5시 - 오전 9시 사이에 퀴즈 XX개 완료함", imageUrl: "../../assets/badges/03earlybird.png" },
    { id: 4, title: "올빼미 학습자", description: "오후 9시 - 오전 5시 사이에 퀴즈 xx개 완료함", imageUrl: "../../assets/badges/04owl.png" },
    { id: 5, title: "exp 메달리스트", description: "누적 경험치 000000 xp를 획득함", imageUrl: "../../assets/badges/b5.jpg" },
    { id: 6, title: "무결점학습자", description: "만점 챕터 xxx개를 달성함", imageUrl: "../../assets/badges/b6.jpg" },
    { id: 7, title: "랭커", description: "전체 랭킹 1위 ~ 10위를 달성함", imageUrl: "../../assets/badges/b7.jpg" },
    { id: 8, title: "탐나는 도다", description: "제주도에 방문함", imageUrl: "../../assets/badges/b8.jpg" },
    { id: 9, title: "사투리의 신", description: "위의 모든 뱃지를 획득함", imageUrl: "../../assets/badges/b8.jpg" },
    // 추가 뱃지 데이터
  ]);

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const modifyProfile = () => {
    navigate(`/my-page/${store.loginUserInfo?.memberId}/profile-edit`)
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    useStore.getState().setLoginUserInfo(undefined);
    console.log("로그아웃되었습니다.") // 추후에 모달로 구현할 것
    navigate('/')
  }

  useEffect(() => {
    console.log("페치데이터 동작!!")
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.saturituri.com/api/profiles/' + store.loginUserInfo?.memberId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
        const data = await response.json();
        setUserData(data);
        console.log("데이터 로드 완료", response);
      } catch (error) {
        console.log("데이터 로드 실패", error)
      }
    }
    fetchData()
  },[]);

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
                        <Logout src={logoutImg} alt='logout' onClick={() => logout()}/>
                      </NicknameBox>
                  </InfoBox>
                  <EditBox>
                    <EditBtn onClick={() => modifyProfile()}>프로필 수정</EditBtn>
                  </EditBox>
              </UserProfile>
              <UserBadge badges={badges} /> 
          </UserProfileBox>
        )}
      {/* JSX 주석 내부에는 다른 JSX 태그를 포함하지 마세요
      <UserRank username={userData?.nickname} tier={userData?.tier} /> */}
    </Container>
  );
};

export default MyPage;