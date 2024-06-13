## 제주어 방언을 재미있게 경험해볼 수 있는 서비스 펠롱펠롱!

![펠롱펠롱](./docs/main.png.png)

## 😮 펠롱펠롱은 이런 프로그램이에요
- **소멸위기언어인 제주어 학습 프로그램** <br>
 2010년 12월, 유네스코는 제주어를 소멸 위기 언어 4단계인 '아주 심각하게 위기에 처한 언어'로 분류했습니다. 펠롱펠롱은 제주어를 배우고 싶지만 학습 진입장벽이 높아 어려움을 호소하는 대중들에게 제주어 학습을 서포트하는 프로그램입니다.

- **게임을 하며 학습할 수 있어요!** <br>
  퀴즈로 실력을 쌓은 후, 사투리 가사 맞추기, 사투리 대사 맞추기의 게임적인 컨텐츠를 즐기며 학습할 수 있습니다. 또한, 멀티플레이와 랭킹시스템을 통해 더욱 흥미를 가지고 학습할 수 있습니다.

- **AI를 통한 제주어-표준어 번역🙆‍♀️** <br>
  딥러닝 기반의 TTS로 편리한 번역서비스 제공을 합니다. 


## 👩‍👩‍👧‍👧 Crew
| 주홍찬 | 강찬우 | 김준형 | 문철환 | 박예분 | 위세영  |
|---|---|---|---|---|---|
| 팀장, BE | FE, UCC | FE | BE, CI/CD, AI  | FE | AI, BE |


## 💻 기술 스택
- **FE**:
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?logo=pwa&logoColor=white)
![Websocket](https://img.shields.io/badge/Websockets-000000?logo=socket.io&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4A90E2?logo=zustand&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

- **BE**:
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?logo=spring-security&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)

- **INFRA**:
![Amazon EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900?logo=amazon-aws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?logo=jenkins&logoColor=white)
![GitLab](https://img.shields.io/badge/GitLab-FC6D26?logo=gitlab&logoColor=white)


- **AI**: ![Kobart](https://img.shields.io/badge/Kobart-FFD700?logo=the-simpsons&logoColor=white)



## 🚀 기능
1. 회원가입 및 소셜로그인 <br>
![](./exec/gif/1.gif)

2. 사투리 모의고사<br>
![](./exec/gif/2.gif)

3. 사투리 퀴즈 <br>
![](./exec/gif/3.gif)

4. 사투리 멀티 게임 <br>
![](./exec/gif/4.gif)

5. 멀티 게임 랭킹 <br>

6. 사투리 번역기 <br>
![](./exec/gif/5.gif)

## 🏝️ 앞으로 펠롱펠롱 서비스의 미래는?
- 제주도 교육청 하의 언어학습 플랫폼
- 제주어 뿐만 아니라, 각 지역의 방언 학습 서비스 제공


## 포팅메뉴얼
[📋포팅메뉴얼 링크](exec/포팅메뉴얼.pdf)


## 컴포넌트 구조
### FrontEnd
📦src  
 ┣ 📂@types  
 ┃ ┣ 📜kakao.d.ts  
 ┣ 📂assets  
 ┃ ┣ 📂JejuPlay  
 ┣ 📂components  
 ┃ ┣ 📂JejuPlay  
 ┃ ┣ 📂JejuQuiz  
 ┃ ┣ 📂MainPage  
 ┃ ┣ 📂MyPage  
 ┣ 📂contexts  
 ┃ ┣ 📜AuthContext.tsx  
 ┃ ┣ 📜useWebsocket.tsx  
 ┣ 📂pages  
 ┃ ┣ 📂JejuEdu  
 ┃ ┣ 📂JejuPlay  
 ┃ ┃ ┣ 📂Other  
 ┃ ┃ ┣ 📂Speed  
 ┃ ┣ 📂JejuQuiz  
 ┃ ┣ 📂JejuTest  
 ┃ ┣ 📂MainPage  
 ┃ ┣ 📂MyPage  
 ┣ 📜App.css  
 ┣ 📜App.tsx  
 ┣ 📜Router.tsx  
 ┣ 📜index.css  
 ┣ 📜index.tsx  
 ┣ 📜react-app-env.d.ts  
 ┣ 📜reportWebVitals.ts  
 ┗ 📜service-worker.js  
 ┗ 📜serviceWorkerRegistration.js  
 ┗ 📜store.ts  

### BackEnd
📦BE/pellongpellong  
 ┣ 📂gradle  
 ┃ ┗ 📂wrapper  
 ┣ 📂src  
 ┃ ┣ 📂main  
 ┃ ┃ ┗ 📂java  
 ┃ ┃ ┃ ┗ 📂com  
 ┃ ┃ ┃ ┃ ┗ 📂C205/pellongpellong  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂config  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂oauth2  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PellongpellongApplication.java  
 ┃ ┗ 📂test  
 ┃ ┃ ┗ 📂java  
 ┃ ┃ ┃ ┗ 📂com  
 ┃ ┃ ┃ ┃ ┗ 📂C205/pellongpellong  
 ┣ 📜.gitignore  
 ┣ 📜build.gradle  
 ┣ 📜docker-compose-redis.yml  
 ┣ 📜gradlew  
 ┣ 📜gradlew.bat  
 ┗ 📜settings.gradle  
