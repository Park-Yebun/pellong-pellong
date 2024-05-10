import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {

  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  }, [accessToken, refreshToken]);

  const handleUnlink = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <div>
      <a href="https://saturituri.com/api/oauth2/authorization/google?redirect_uri=https://saturituri.com/test&mode=login">
        <button>Google Login</button>
      </a>
      <a href="https://saturituri.com/api/oauth2/authorization/google?redirect_uri=https://saturituri.com/test&mode=unlink">
        <button onClick={handleUnlink}>Google Unlink</button>
      </a>
      <a href="https://saturituri.com/api/oauth2/authorization/naver?redirect_uri=https://saturituri.com/test&mode=login">
        <button>Naver Login</button>
      </a>

      <a href="https://saturituri.com/api/oauth2/authorization/naver?redirect_uri=https://saturituri.com/test&mode=unlink">
        <button onClick={handleUnlink}>Naver Unlink</button>
      </a>

      <a href="https://saturituri.com/api/oauth2/authorization/kakao?redirect_uri=https://saturituri.com/test&mode=login">
        <button>Kakao Login</button>
      </a>

      <a href="https://saturituri.com/api/oauth2/authorization/kakao?redirect_uri=https://saturituri.com/test&mode=unlink">
        <button onClick={handleUnlink}>Kakao Unlink</button>
      </a>

      <p>Access Token : {accessToken}</p>
      <p>Refresh Token : {refreshToken}</p>

    </div>
  );
};

export default Home;
