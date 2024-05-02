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
import JejuDramaReady from './pages/JejuPlay/Drama/JejuDramaReady';
import JejuDramaPlay from './pages/JejuPlay/Drama/JejuDramaPlay';
import JejuDramaLose from './pages/JejuPlay/Drama/JejuDramaLose';
import JejuDramaResult from './pages/JejuPlay/Drama/JejuDramaResult';
import JejuMusicReady from './pages/JejuPlay/Music/JejuMusicReady';
import JejuMusicPlay from './pages/JejuPlay/Music/JejuMusicPlay';
import JejuMusicLose from './pages/JejuPlay/Music/JejuMusicLose';
import JejuMusicResult from './pages/JejuPlay/Music/JejuMusicResult';
import JejuSpeedReady from './pages/JejuPlay/Speed/JejuSpeedReady';
import JejuSpeedPlay from './pages/JejuPlay/Speed/JejuSpeedPlay';
import JejuSpeedLose from './pages/JejuPlay/Speed/JejuSpeedLose';
import JejuSpeedResult from './pages/JejuPlay/Speed/JejuSpeedResult';

function App() {
  return (
      <Routes>
        <Route path="/social-login" element={<SocialLoginPage />} />
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
        <Route path="/jeju-edu/play-page/:video-id" element={<ShadowingPlayPage />} />
        <Route path="/jeju-edu/result" element={<ShadowingResultPage />} />
        <Route path="/jeju-play" element={<PlayMainPage />} />
        <Route path="/drama" element={<JejuDramaReady />} />
        <Route path="/drama/play-page" element={<JejuDramaPlay />} />
        <Route path="/drama/lose-page" element={<JejuDramaLose />} />
        <Route path="/drama/result" element={<JejuDramaResult />} />
        <Route path="/music" element={<JejuMusicReady />} />
        <Route path="/music/play-page" element={<JejuMusicPlay />} />
        <Route path="/music/lose-page" element={<JejuMusicLose />} />
        <Route path="/music/result" element={<JejuMusicResult />} />
        <Route path="/speed" element={<JejuSpeedReady />} />
        <Route path="/speed/play-page" element={<JejuSpeedPlay />} />
        <Route path="/speed/lose-page" element={<JejuSpeedLose />} />
        <Route path="/speed/result" element={<JejuSpeedResult />} />
      </Routes>
  );
}

export default App;
