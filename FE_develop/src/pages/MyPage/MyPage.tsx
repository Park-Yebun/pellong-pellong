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
    { id: 1, title: "First Win", description: "Won your first match.", imageUrl: "../../assets/badges/b1.jpg" },
    { id: 2, title: "Marathoner", description: "Completed a marathon.", imageUrl: "../../assets/badges/b2.jpg" },
    { id: 3, title: "Bookworm", description: "Read 100 books.", imageUrl: "../../assets/badges/b3.jpg" },
    { id: 4, title: "First Win", description: "Won your first match.", imageUrl: "../../assets/badges/b4.jpg" },
    { id: 5, title: "Marathoner", description: "Completed a marathon.", imageUrl: "../../assets/badges/b5.jpg" },
    { id: 6, title: "Bookworm", description: "Read 100 books.", imageUrl: "../../assets/badges/b6.jpg" },
    { id: 7, title: "First Win", description: "Won your first match.", imageUrl: "../../assets/badges/b7.jpg" },
    { id: 8, title: "Marathoner", description: "Completed a marathon.", imageUrl: "../../assets/badges/b8.jpg" },
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
        const response = await fetch('https://www.saturituri.com/api/members/' + store.loginUserInfo?.memberId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
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
                        <Nickname>예분</Nickname>
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