import React, { useEffect, useState } from 'react';
import { useErrorBoundary } from "react-error-boundary";
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Experience {
  expId: number;
  memberId: number;
  exp: number;
  expName: string;
  expAt: string;
}

const ExperienceLog: React.FC = () => {
  const { showBoundary } = useErrorBoundary();
  const { memberId } = useParams<{ memberId: string }>();
  const [experienceLog, setExperienceLog] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Experience[]>(`http://localhost:8080/profiles/explog/${memberId}`);
        const formattedData = response.data.map((log) => ({
          ...log,
          expAt: new Date(log.expAt).toLocaleString('ko-KR'),
        }));
        setExperienceLog(formattedData);
      } catch (error) {
        showBoundary(error);
        console.error('Error fetching experience log:', error);
      }
    };

    fetchData();
  }, [memberId]);

  return (
    <div>
      <h2>경험치 적립 내역 </h2>
      <ul>
        {experienceLog.map((log) => (
          <li key={log.expId}>
            <div>
              <strong>내역 : </strong> {log.expName}
            </div>
            <div>
              <strong>경험치 : </strong> {log.exp}
            </div>
            <div>
              <strong>일자 : </strong> {log.expAt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceLog;
