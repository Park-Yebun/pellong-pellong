import React from "react";
import { useSearchParams } from "react-router-dom";

const TestPage = () => {

  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  return (
    <div>
      <a href="http://localhost:8080/oauth2/authorization/google?redirect_uri=https://www.saturituri.com/test&mode=login">
        <button>Google Login</button>
      </a>
      <a href="http://localhost:8080/oauth2/authorization/google?redirect_uri=https://www.saturituri.com/test&mode=unlink">
        <button>Google Unlink</button>
      </a>
      <a href="http://localhost:8080/oauth2/authorization/naver?redirect_uri=https://www.saturituri.com/test&mode=login">
        <button>Naver Login</button>
      </a>

      <a href="http://localhost:8080/oauth2/authorization/naver?redirect_uri=https://www.saturituri.com/test&mode=unlink">
        <button>Naver Unlink</button>
      </a>

      <a href="http://localhost:8080/oauth2/authorization/kakao?redirect_uri=https://www.saturituri.com/test&mode=login">
        <button>Kakao Login</button>
      </a>

      <a href="http://localhost:8080/oauth2/authorization/kakao?redirect_uri=https://www.saturituri.com/test&mode=unlink">
        <button>Kakao Unlink</button>
      </a>

      <p>Access Token : {accessToken}</p>
      <p>Refresh Token : {refreshToken}</p>

    </div>
  );
};

export default TestPage;
