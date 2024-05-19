import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BackButton from '../../components/BackButton'
import './ShadowingMainPage.css';


const ShadowingMainPage = () => {
  
  const PLID:string = process.env.REACT_APP_Youtube_PL_ID as string;
  const APIKEY:string = process.env.REACT_APP_Youtube_API_KEY as string;
  const [shadowingData, setShadowingData] = useState<any[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLID}&key=${APIKEY}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setShadowingData(data.items);
      // console.log('데이터 로드 성공', data.items)
    } catch (error) {
      // console.log('데이터 로드 실패', error)
      
    }
  }
  fetchData()
}, []);

const goDetail = (videoId:string) => {
  navigate(`/jeju-edu/play-page/${videoId}`);
}


  return (
    <div className='SH-background'>
      <div className='SH-upperbar'>
      <BackButton />
        <div className='SH-text-con'>
          <div className='SH-content-box'>CONTENTS</div>
          <div className='SH-description-box'>제주어 영상을 보며 <br /> 제주도에 익숙해져요</div>
        </div>
      </div>
      {shadowingData.map(({id, snippet}) => (
        <div key={id} className='SH-yotube-box' onClick={() => goDetail(snippet.resourceId.videoId)}>
          <div><img src={snippet.thumbnails.medium.url} alt={`쉐도잉 리스트 : ${id}`} /></div>
          <div>
            <h5>{snippet.title}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};




export default ShadowingMainPage;
