import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async' 

// // Kakao SDK 초기화
// window.Kakao.init(e0fa5b77eeb09774b4790016ba7d94f5);

// // Kakao SDK 초기화 여부 확인
// const isKakaoInitialized = window.Kakao.isInitialized();


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
    <HelmetProvider>
      <Routes>
        <Route path="*" element={ <App /> }>
        </Route>
      </Routes>
      </HelmetProvider>
    </BrowserRouter>
)
reportWebVitals();