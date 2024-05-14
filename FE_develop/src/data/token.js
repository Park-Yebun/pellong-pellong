import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();
const accessToken = searchParams.get('access_token');
const refreshToken = searchParams.get('refresh_token');

if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
}

if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
}