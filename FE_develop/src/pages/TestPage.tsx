import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Home = () => {

  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken); // 이 부분 수정
      setDecodedToken(decoded);
    }
  }, [accessToken]);

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
      {decodedToken && (
                <div>
                <h2>Decoded Access Token:</h2>
                <p>User ID: {decodedToken.sub}</p>
                <p>Name: {decodedToken.name}</p>
                <p>Email: {decodedToken.email}</p>
                    </div>
      )}

    </div>
  );
};

export default Home;
