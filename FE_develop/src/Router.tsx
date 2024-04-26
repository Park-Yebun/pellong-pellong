import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지들을 import
import SocialLogin from './pages/SocialLogin';
import MainPage from './pages/MainPage';
import MyPageMain from './pages/MyPage/MyPage';
import ProfileEdit from './pages/MyPage/ProfileEdit';
import RankPage from './pages/MyPage/RankPage';
import JejuQuizListPage from './pages/JejuQuiz/JejuQuizListPage';
import JejuQuizPage from './pages/JejuQuiz/JejuQuizPage';
import QuizResolvePage from './pages/JejuQuiz/QuizResolvePage';
import QuizResultPage from './pages/JejuQuiz/QuizResultPage';
// 이하 다른 페이지들도 동일하게 import

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/social-login" element={<SocialLogin />} />
        <Route path="/my-page" element={<MyPageMain />} />
        <Route path="/my-page/profile-edit" element={<ProfileEdit />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/jeju-quiz" element={<JejuQuizListPage />} />
        <Route path="/jeju-quiz/quiz-page" element={<JejuQuizPage />} />
        <Route path="/jeju-quiz/resolve" element={<QuizResolvePage />} />
        <Route path="/jeju-quiz/result" element={<QuizResultPage />} />
        // 이하 다른 페이지들도 동일하게 설정
      </Routes>
  );
}

export default Router;
