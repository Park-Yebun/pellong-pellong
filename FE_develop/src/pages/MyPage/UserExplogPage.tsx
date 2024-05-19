import React, { useEffect, useState } from 'react';
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
  const { memberId } = useParams<{ memberId: string }>();
  const [experienceLog, setExperienceLog] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Experience[]>(`https://www.saturituri.com/api/profiles/explog/${memberId}`);
        setExperienceLog(response.data);
      } catch (error) {
        console.error('Error fetching experience log:', error);
      }
    };

    fetchData();
  }, [memberId]);

  return (
    <div>
      <h2>Experience Log for Member ID: {memberId}</h2>
      <ul>
        {experienceLog.map((log) => (
          <li key={log.expId}>
            <div>
              <strong>Experience Name:</strong> {log.expName}
            </div>
            <div>
              <strong>Experience:</strong> {log.exp}
            </div>
            <div>
              <strong>Date:</strong> {new Date(log.expAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceLog;
