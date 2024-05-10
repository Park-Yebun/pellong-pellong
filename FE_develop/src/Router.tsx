import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PlayResultPage from './pages/JejuPlay/PlayResultPage';
import WaitingRoomPage from './pages/JejuPlay/WaitingRoomPage';

// component
import SoloUser from './components/JejuPlay/SoloUser';
import DuelUser from './components/JejuPlay/DuelUser';

// test
import Test from './pages/TestPage';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<SocialLoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/my-page" element={<MyPageMain />} />
        <Route path="/my-page/profile-edit" element={<ProfileEdit />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/jeju-quiz" element={<JejuQuizListPage />} />
        <Route path="/jeju-quiz/quiz-page" element={<JejuQuizPage />} />
        <Route path="/jeju-quiz/resolve" element={<QuizResolvePage />} />
        <Route path="/jeju-quiz/result" element={<QuizResultPage />} />
        <Route path="/jeju-test" element={<TestFirstPage />} />
        <Route path="/jeju-test/test-page" element={<TestPage />} />
        <Route path="/jeju-test/test-result" element={<TestResultPage />} />
        <Route path="/jeju-edu" element={<ShadowingMainPage />} />
        <Route path="/jeju-edu/play-page/:videoId" element={<ShadowingPlayPage />} />
        <Route path="/jeju-edu/result" element={<ShadowingResultPage />} />
        <Route path="/jeju-play" element={<PlayMainPage />} />
        <Route path="/jeju-play/create" element={<CreateWaitingRoom />} />
        <Route path="/jeju-play/gameover" element={<GameOverPage />} />  
        <Route path="/jeju-play/other/:partyId" element={<OtherPlayPage />} />
        <Route path="/jeju-play/speed/:partyId" element={<SpeedPlayPage />} />
        <Route path="/jeju-play/:partyId/result" element={<PlayResultPage />} />
        <Route path="/jeju-play/:partyId/wait" element={<WaitingRoomPage />} />
        {/* component */}
        {/* <Route path="/solo" element={<SoloUser />} /> */}
        <Route path="/duel" element={<DuelUser />} />
        {/* test */}
        <Route path="/test" element={<Test />} />
      </Routes>
  );
}

export default App;
