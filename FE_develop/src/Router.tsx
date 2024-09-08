import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SocialLoginPage from './pages/SocialLogin';
import MainPage from './pages/MainPage';
import MyPageMain from './pages/MyPage/MyPage';
import ProfileEdit from './pages/MyPage/ProfileEdit';

import RankPage from './pages/MyPage/RankPage';
import JejuQuizListPage from './pages/JejuQuiz/JejuQuizListPage';
import JejuQuizPage from './pages/JejuQuiz/JejuQuizPage';
import QuizResolvePage from './pages/JejuQuiz/QuizResolvePage';
import QuizResultPage from './pages/JejuQuiz/QuizResultPage';
import TestFirstPage from './pages/JejuTest/TestFirstPage';
import TestPage from './pages/JejuTest/TestPage';
import TestResultPage from './pages/JejuTest/TestResultPage';
import ShadowingMainPage from './pages/JejuEdu/ShadowingMainPage';
import ShadowingPlayPage from './pages/JejuEdu/ShadowingPlayPage';
import ShadowingResultPage from './pages/JejuEdu/ShadowingResultPage';
import PlayMainPage from './pages/JejuPlay/PlayMainPage';
import CreateWaitingRoom from './pages/JejuPlay/CreateWaitingRoom';
import GameOverPage from './pages/JejuPlay/GameOverPage';
import OtherPlayPage from './pages/JejuPlay/Other/OtherPlayPage';
import SpeedPlayPage from './pages/JejuPlay/Speed/SpeedPlayPage';
import SpeedPlayResultPage from './pages/JejuPlay/Speed/SpeedPlayResultPage';
import OtherPlayResultPage from './pages/JejuPlay/Other/OtherPlayResultPage';
import WaitingRoomPage from './pages/JejuPlay/WaitingRoomPage';
//철환추가
import TranslatePage from './pages/TranslatePage';

// component
import SoloUser from './components/JejuPlay/SoloUser';
import DuelUser from './components/JejuPlay/DuelUser';

// test
import Test from './pages/TestPage';

import { AuthProvider } from './contexts/AuthContext';
import ExperienceLog from './pages/MyPage/UserExplogPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<SocialLoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/my-page/:memberId" element={<MyPageMain />} />
        <Route path="/my-page/:memberId/profile-edit" element={<ProfileEdit />} />
        <Route path="/my-page/:memberId/Explog" element={<ExperienceLog />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/jeju-quiz" element={<JejuQuizListPage />} />
        <Route path="/jeju-quiz/level/:level" element={<JejuQuizPage />} />
        <Route path="/jeju-quiz/resolve" element={<QuizResolvePage />} />
        <Route path="/jeju-quiz/result" element={<QuizResultPage />} />
        <Route path="/jeju-test" element={<TestFirstPage />} />
        <Route path="/jeju-test/test-page" element={<TestPage />} />
        <Route path="/jeju-test/test-result/:score/:testnum/:name" element={<TestResultPage />} />
        <Route path="/jeju-edu" element={<ShadowingMainPage />} />
        <Route path="/jeju-edu/play-page/:videoId" element={<ShadowingPlayPage />} />
        <Route path="/jeju-edu/result" element={<ShadowingResultPage />} />
        <Route path="/jeju-play" element={<PlayMainPage />} />
        <Route path="/jeju-play/create" element={<CreateWaitingRoom />} />
        <Route path="/jeju-play/gameover/:partyId" element={<GameOverPage />} />  
        <Route path="/jeju-play/other/:partyId" element={<OtherPlayPage />} />
        <Route path="/jeju-play/speed/:partyId" element={<SpeedPlayPage />} />
        <Route path="/jeju-play/speed/:partyId/result" element={<SpeedPlayResultPage />} />
        <Route path="/jeju-play/other/:partyId/result" element={<OtherPlayResultPage />} />
        <Route path="/jeju-play/:partyId/wait" element={<WaitingRoomPage />} />
        <Route path="/ai" element={<TranslatePage />} /> {/* TranslatePage 철환 라우터 추가 */}
        {/* component */}
        {/* <Route path="/solo" element={<SoloUser />} /> */}
        <Route path="/duel" element={<DuelUser />} />
        {/* test */}
        <Route path="/test" element={<Test />} />
      </Routes>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
