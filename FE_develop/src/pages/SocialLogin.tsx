import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useErrorBoundary } from "react-error-boundary";
import useStore from '../store';
import styled from "styled-components";
import background from '../assets/login-background.png';
import google from '../assets/login-google.png';
import kakao from '../assets/login-kakao.png';
import axios from 'axios';
import { error } from 'console';

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
  const { showBoundary } = useErrorBoundary();
  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken) as JwtPayload;
      localStorage.setItem('accessToken', accessToken);
      store.setLoginUserInfo(decoded);

      axios.get('http://localhost:8080/members/info', {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        withCredentials: true,
      })
      .then((response) => {
        store.setLoginUserInfo(response.data);
        navigate('/');
      })
      .catch((error) => {
        showBoundary(error);
      });
    }
  }, [accessToken]);
  
  return (
    <Container>
      <Google onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/login&mode=login"}></Google>
      <Kakao onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login&mode=login"}></Kakao>
    </Container>
  );
};

export default SocialLoginPage;
