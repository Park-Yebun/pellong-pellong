import styled from 'styled-components';
import background from '../../assets/JejuPlay/background2.png'

export const Container = styled.div`
    width: 360px;
    height: 800px;
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    background: #E9FFD9 url(${background}) center center / cover no-repeat;
    background-size: 360px 329px;
    background-position: center 460px;
`

export const UpperBox = styled.div`
    width: 360px;
    height: 135px;

    background: #BDE8A1;
`

export const SubTextBox = styled.div`
    margin-left: 29px;
    margin-top: 10px;

    color: #FFF;

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.005px;
`

export const MainTextBox = styled.div`
    margin-left: 26px;
    margin-top: 11px;

    color: #FFF;

    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.022px;
`

export const PlayerContainer = styled.div`
    width: 279px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 50px;
`

export const Player = styled.div`
    width: 135px;
    height: 135px;
    margin-bottom: 9px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 0px 5px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const ProfileImg = styled.img`
    width: 64px;
    height: 64px;
    margin-top: 20px;

    background: #BDE8A1;
    border-radius: 60px;
`

export const Nickname = styled.div`
    margin-top: 13px;

    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.016px;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const StartBtn = styled.div`
    width: 281px;
    height: 66px;
    margin-top: 29px;

    border-radius: 10px;
    background: #D9D9D9;
    
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px; /* 120% */
    letter-spacing: 0.1px;

`