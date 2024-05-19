// RankPage.tsx
import React, { useState, useEffect } from 'react';
import './RankPage.css';
import BackButton from '../../components/BackButton';
import close from '../../assets/JejuPlay/close.png'
import useStore from '../../store';
import ReactApexChart from "react-apexcharts";

interface User {
  memberId: number;
  nickname: string;
  sumExp: number;
  profileImg: string;
  // rankBadge: string;
  rankId: number;
}

const sortAndRankUsers = (users: User[]): User[] => {
  const sortedUsers = users.sort((a, b) => b.sumExp - a.sumExp);
  let rank = 1;
  let prevExperience = sortedUsers[0].sumExp;

  console.log("=== 랭크 부여 과정 ===");
  console.log("랭크\t아이디\t유저네임\t경험치");
  
  const rankedUsers = sortedUsers.map((user, index) => {
    if (index > 0 && user.sumExp !== prevExperience) {
      rank++;
    }
    console.log(`${rank}\t${user.memberId}\t${user.nickname}\t${user.sumExp}`);
    prevExperience = user.sumExp;
    return { ...user, rank };
  });

  return rankedUsers;
};

const UserRanking: React.FC = () => {
  const store = useStore();
  const [users, setUsers] = useState<User[]>([]);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false); // 이 부분을 함수 컴포넌트 내부로 이동
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // 클릭된 유저 정보를 상태로 관리
  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    // title: {
    //   text: 'Average High & Low Temperature',
    //   align: 'left'
    // }, 제목 없앰
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Temperature'
      },
      min: 5,
      max: 40
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  });

  const [chartSeries, setChartSeries] = useState<any>([
    {
      name: `${selectedUser?.nickname}`,
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: "Low - 2013",
      data: [12, 11, 14, 18, 17, 13, 13]
    }
  ]);


  useEffect(() => {
    console.log("페치데이터 동작!!")
    console.log(store.loginUserInfo?.memberId)
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://www.saturituri.com/api/ranking', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data: User[] = await response.json();
        const rankedUsers = sortAndRankUsers(data);
        setUsers(rankedUsers);
        console.log("데이터 로드 완료", data);
      } catch (error) {
        console.log("데이터 로드 실패", error)
      }
    }
    fetchUsers();
  }, []);

  const getRankBadge = (sumExp: number) => {
    if (sumExp >= 0 && sumExp < 100) {
      return '../../assets/badge/small.png';
    }
    else if (sumExp >= 100 && sumExp < 300) {
      return '../../assets/badge/middle.png';
    }
    else if (sumExp >= 300 && sumExp < 500) {
      return '../../assets/badge/big.png';
    }
    else if (sumExp >= 500 && sumExp < 1000) {
      return '../../assets/badge/sobig.png';
    }
    else if (sumExp > 1000)
      return '../../assets/badge/brilliant.png';
  };

  const handleUserClick = async (user: User) => {
    setSelectedUser(user); // 클릭된 유저 정보 설정
    setPasswordModalOpen(true); // 모달 열기
    try {  
      const response = await fetch(`https://www.saturituri.com/api/exp/${store.loginUserInfo?.memberId}/${user.memberId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const userInfo: string = await response.json();
      console.log("찍혀라", userInfo)

      // 차트 데이터 업데이트
      setChartSeries([
        {
          name: user.nickname,
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: store.loginUserInfo?.nickname,
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ]);





    } catch (error) {
      console.log("유저 정보 로드 실패", error)
    }
  };

  

  return (
    <div className="RK-user-ranking-container">
      <BackButton />
      <div className='RK-ranking-title'>랭킹 조회</div>
      <div className="RK-user-grid">
        {users.map((user) => (
          <div key={user.memberId} className="RK-user-card" onClick={() => handleUserClick(user)}>
            <div className="RK-user-info">
              <span className="RK-rank-number">{user.rankId}</span>
              <span className="RK-rank-badge">
                <img src={getRankBadge(user.sumExp)} alt=""/>
              </span>
              <img className="RK-profile-picture" src={user.profileImg} alt={`Profile of ${user.nickname}`} />
              <p className="RK-username">{user.nickname}</p>
              <p className="RK-experience">{user.sumExp}xp</p>
            </div>
          </div>
        ))}
      </div>
      {passwordModalOpen && (
        <div className='password-modal'>
          <img className='close' src={close} alt="closebtn" onClick={() => {setPasswordModalOpen(false);}}/>
          <div className='password-txt'>
            {/* 클릭된 유저 정보를 모달 내에서 표시 */}
            {selectedUser && `${selectedUser.nickname}과 나의 지난 3일간 적립 경험치 비교`}
            <div id="chart">
              <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserRanking;
