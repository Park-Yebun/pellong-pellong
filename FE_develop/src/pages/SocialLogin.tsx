import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useStore from '../store';
import styled from "styled-components";
import background from '../assets/login-background.png';
import google from '../assets/login-google.png';
import kakao from '../assets/login-kakao.png';

export const Container = styled.div`
  width: 360px;
  height: 800px;
  position: relative;

  background: url(${background}) center center / cover no-repeat;
  // background-size: 360px 183px;
  // background-position: center 617px;
`

export const Google = styled.div`
  width: 218px;
  height: 46px;
  position: absolute;
  margin-top: 179px;
  margin-left: 71px;

  background: url(${google}) center center / cover no-repeat;
  // background-size: 360px 183px;
  // background-position: center 617px;
`

export const Kakao = styled.div`
  width: 218px;
  height: 46px;
  position: absolute;
  margin-top: 240px;
  margin-left: 71px;

  background: url(${kakao}) center center / cover no-repeat;
  // background-size: 360px 183px;
  // background-position: center 617px;
`

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
    // console.log("패치데이터 작동!!")
    const fetchData = async () => {
     if (accessToken) {
        const decoded = jwtDecode(accessToken) as JwtPayload;
        localStorage.setItem('accessToken', accessToken);
        store.setLoginUserInfo(decoded);

        try {
          // console.log(accessToken)
          // console.log(typeof accessToken)
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
          console.log("로그인 데이터 저장 완료", userInfo)
          navigate('/')
        } catch (error) {
          console.log(error)
        };
      };
    }
    fetchData();
  }, [accessToken]);
  return (
    <Container>
      <Google></Google>
      <Kakao onClick={() => window.location.href = "https://saturituri.com/api/oauth2/authorization/kakao?redirect_uri=https://www.saturituri.com/login/&mode=login"}></Kakao>
    </Container>
  );
};

export default SocialLoginPage;
