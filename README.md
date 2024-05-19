## 제주어 방언을 재미있게 경험해볼 수 있는 서비스 펠롱펠롱!

![펠롱펠롱]()

## 😮 펠롱펠롱은 어떤 서비스인가요?
- **1.** <br>

- **2.** <br>

- **3. 🙆‍♀️** <br>



## 👩‍👩‍👧‍👧 Crew
| 팀장, BE | FE, BE | CI/CD, AI | FE | FE | BE, FE  |
|---|---|---|---|---|---|
| 주홍찬 | 강찬우 | 문철환 | 박예분 | 김준형 | 위세영 |
| [주홍찬]() | [강찬우]() | [문철환]() | [박예분]() | [김준형]() | [위세영]() |


## 💻 기술 스택
- **FE**:
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

- **BE**:
  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white">  <img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=white">

- **INFRA**:
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">  <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">  <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">

- **AI**: 



## 🚀 기능
1. 회원가입 및 로그인 <br>
![소셜로그인]()
2. 사투리 퀴즈 <br>
![사투리 퀴즈]]()
3. 사투리 모의고사 <br>
![사투리 모의고사]()
4. 사투리 번역기 <br>
![사투리 번역기]()


## 🐘 앞으로의 펠롱펠롱 서비스는?
- 
- 

## 포팅메뉴얼
[📋포팅메뉴얼 노션 링크]()


## 컴포넌트 구조
### FrontEnd
📦src  
 ┣ 📂assets  
 ┃ ┣ 📂book  
 ┃ ┣ 📂bookshelf  
 ┃ ┣ 📂error  
 ┃ ┣ 📂header  
 ┃ ┣ 📂library  
 ┃ ┣ 📂main  
 ┃ ┣ 📂story  
 ┃ ┣ 📂study  
 ┃ ┣ 📂user  
 ┣ 📂components  
 ┃ ┣ 📂api  
 ┃ ┣ 📂common  
 ┃ ┣ 📂Counter  
 ┃ ┣ 📂header  
 ┃ ┣ 📂main  
 ┃ ┣ 📂Modal  
 ┃ ┗ 📂story  
 ┣ 📂pages  
 ┣ 📜App.css  
 ┣ 📜App.jsx  
 ┣ 📜index.css  
 ┣ 📜main.jsx  
 ┣ 📜ResrtictRoute.jsx  
 ┗ 📜service-worker.js  

### BackEnd
📦BE  
 ┣ 📂gradle  
 ┃ ┗ 📂wrapper  
 ┣ 📂src  
 ┃ ┣ 📂main  
 ┃ ┃ ┗ 📂java  
 ┃ ┃ ┃ ┗ 📂com  
 ┃ ┃ ┃ ┃ ┗ 📂kkirikkiri  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂config  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂domain  
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂book  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂enums  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂bookshelf  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂learning  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂member  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂enums  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂global  
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂common  
 ┃ ┗ 📂test  
 ┃ ┃ ┗ 📂java  
 ┃ ┃ ┃ ┗ 📂com  
 ┃ ┃ ┃ ┃ ┗ 📂kkirikkiri  
 ┣ 📜.gitignore  
 ┣ 📜build.gradle  
 ┣ 📜docker-compose-redis.yml  
 ┣ 📜gradlew  
 ┣ 📜gradlew.bat  
 ┗ 📜settings.gradle  
