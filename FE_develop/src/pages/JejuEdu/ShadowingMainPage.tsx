import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      console.log('데이터 로드 성공', data.items)
    } catch (error) {
      console.log('데이터 로드 실패', error)
      
    }
  }
  fetchData()
}, []);

const goDetail = (videoId:string) => {
  navigate(`/jeju-edu/play-page/${videoId}`);
}


  return (
    <div className='background'>
      <div className='upperbar'>
        <div className='content-box'>CONTENTS</div>
        <div className='description-box'>제주어를 발음해봐요</div>
      </div>
      <div>날짜순</div>
      {shadowingData.map(({id, snippet}) => (
        <div key={id} className='yotube-box' onClick={() => goDetail(snippet.resourceId.videoId)}>
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
