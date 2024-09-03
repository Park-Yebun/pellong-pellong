import React from "react";
import { Helmet } from "react-helmet-async";

export function MainMeta(): JSX.Element {
  return (
    <Helmet>
      <meta name="site_name" content="pellong-pellong"/>
      <meta name="title" content="펠롱펠롱"/>
      <meta name="url" content="https://www.saturituri.com"/>
      <meta name="description" content="제주도 사투리를 재밌는 게임을 통해 쉽고 재밌게 경험할 수 있는 펠롱펠롤입니다."/>
    </Helmet>
  );
}

export function RankMeta(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:site_name" content="pellong-pellong"/>
      <meta property="og:title" content="펠롱펠롱"/>
      <meta property="og:url" content="https://www.saturituri.com/rank"/>
      <meta property="og:description" content="유저별 경험치 랭킹을 볼 수 있는 페이지입니다."/>
    </Helmet>
  );
}

export function JejuQuizMeta(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:site_name" content="pellong-pellong"/>
      <meta property="og:title" content="펠롱펠롱"/>
      <meta property="og:url" content="https://www.saturituri.com/jeju-quiz"/>
      <meta property="og:description" content="제주도 사투리 퀴즈 목록을 볼 수 있는 페이지입니다."/>
    </Helmet>
  );
}

export function JejuTestMeta(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:site_name" content="pellong-pellong"/>
      <meta property="og:title" content="펠롱펠롱"/>
      <meta property="og:url" content="https://www.saturituri.com/jeju-test"/>
      <meta property="og:description" content="제주어 모의고사를 풀어볼 수 있는 페이지입니다."/>
    </Helmet>
  );
}

export function JejuPlayMeta(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:site_name" content="pellong-pellong"/>
      <meta property="og:title" content="펠롱펠롱"/>
      <meta property="og:url" content="https://www.saturituri.com/jeju-play"/>
      <meta property="og:description" content="다른 유저와 함께 제주어 퀴즈를 풀 수 있는 제주 놀이터 페이지입니다."/>
    </Helmet>
  );
}

export function JejuAiMeta(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:site_name" content="pellong-pellong"/>
      <meta property="og:title" content="펠롱펠롱"/>
      <meta property="og:url" content="https://www.saturituri.com/ai"/>
      <meta property="og:description" content="제주도 사투리 번역기 페이지입니다."/>
    </Helmet>
  );
}