import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary'; // 기존 error boundary 모듈 사용
import ErrorFallback from './ErrorFallback';          // 에러 발생시에 보여줄 UI

// // Kakao SDK 초기화
// window.Kakao.init(e0fa5b77eeb09774b4790016ba7d94f5);

// // Kakao SDK 초기화 여부 확인
// const isKakaoInitialized = window.Kakao.isInitialized();


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// export const queryClient = new QueryClient();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
}});

root.render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
);

reportWebVitals();