import React, {useEffect} from 'react';
import { useSearchParams } from "react-router-dom";
import useStore from '../store' 
import styled from "styled-components";
import background from '../assets/login-background.png'
import google from '../assets/login-google.png'
import kakao from '../assets/login-kakao.png'

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

const SocialLoginPage = () => {
  return (
    <Container>
      <Google></Google>
      <Kakao onClick={() => window.location.href = "https://saturituri.com/api/oauth2/authorization/kakao?redirect_uri=https://saturituri.com/&mode=login"}></Kakao>
    </Container>
  );
};

export default SocialLoginPage;
