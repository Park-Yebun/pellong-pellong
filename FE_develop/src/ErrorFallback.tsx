import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { FallbackProps } from "react-error-boundary"
import styled from 'styled-components';
import background from './assets/login-background.png';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${background}) center center / cover no-repeat;
    filter: opacity(0.5);
    z-index: -1;
  }
`

const Message = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.024px;

  margin-top: 280px;
  text-align: center;
`

const Button = styled.div`
  width: 112px;
  height: 39px;

  border-radius: 10px;
  background: #00AFCA;

  color: #FFF;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.016px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 41px;
`


const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  type ErrorCodeType = {
    [key: string]: { code: string; message: string; buttonText: string; };
  };

  const ERROR_CODE: ErrorCodeType = {
    default: { code: 'ERROR', message: '정보를 불러올 수 없어요.', buttonText: '다시 불러오기'},
    400: { code: '400', message: '예상치 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요.', buttonText: '뒤로 가기'},
    401: { code: '401', message: '접근 권한 없음', buttonText: '뒤로 가기'},
    500: { code: '500', message: '예상치 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요.', buttonText: '뒤로 가기'},
  } as const;
  
  const getErrorCode = (error: AxiosError<{ code: number; message: string }>) => {
    const serverErrorCode = error?.response?.data?.code ?? '';
    const httpErrorCode = error?.response?.status ?? '';
    if (serverErrorCode in ERROR_CODE) {
      return ERROR_CODE[serverErrorCode as keyof typeof ERROR_CODE];
    }
    if (httpErrorCode in ERROR_CODE) {
      return ERROR_CODE[httpErrorCode as keyof typeof ERROR_CODE];
    }
    return ERROR_CODE.default;
  };

  const errorCode = getErrorCode(error);

  const controllClick = () => {
    if (errorCode.buttonText === '뒤로 가기') {
      navigate(-1);
    }
    resetErrorBoundary();
  }

  return (
    <Container>
      <Message>{errorCode.message}</Message>
      <Button onClick={controllClick}>{errorCode.buttonText}</Button>
    </Container>
  );
}

export default ErrorFallback;