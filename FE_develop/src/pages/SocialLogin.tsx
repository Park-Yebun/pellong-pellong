import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useStore from '../store';
import styled from "styled-components";
import background from '../assets/login-background.png';
import google from '../assets/login-google.png';
import kakao from '../assets/login-kakao.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${background}) center center / cover no-repeat;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 2px; /* 상단에서 간격을 주기 위해 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Google = styled.div`
  width: 218px;
  height: 46px;
  margin: 10px 0; /* 간격을 주기 위해 margin 사용 */

  background: url(${google}) center center / cover no-repeat;
  cursor: pointer;
`;

export const Kakao = styled.div`
  width: 218px;
  height: 46px;
  margin: 10px 0; /* 간격을 주기 위해 margin 사용 */

  background: url(${kakao}) center center / cover no-repeat;
  cursor: pointer;
`;

interface JwtPayload {
  memberId: number;
  email: string;
  nickname: string;
  profileImg: string;
}

const SocialLoginPage = () => {
  const [searchParams] = useSearchParams();
  const store = useStore();
  const navigate = useNavigate();
  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        const decoded = jwtDecode(accessToken) as JwtPayload;
        localStorage.setItem('accessToken', accessToken);
        store.setLoginUserInfo(decoded);

        try {
          const response = await fetch('https://www.saturituri.com/api/members/info', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json;charset=UTF-8',
            },
            credentials: 'include',
          });
          const userInfo = await response.json();
          store.setLoginUserInfo(userInfo)
          // console.log("로그인 데이터 저장 완료", userInfo)
          navigate('/')
        } catch (error) {
          // console.log(error)
        };
      };
    }
    fetchData();
  }, [accessToken]);
  
  return (
    <Container>
      <Google onClick={() => window.location.href = "https://www.saturituri.com/api/oauth2/authorization/google?redirect_uri=https://www.saturituri.com/login&mode=login"}></Google>
      <Kakao onClick={() => window.location.href = "https://www.saturituri.com/api/oauth2/authorization/kakao?redirect_uri=https://www.saturituri.com/login&mode=login"}></Kakao>
    </Container>
  );
};

export default SocialLoginPage;
