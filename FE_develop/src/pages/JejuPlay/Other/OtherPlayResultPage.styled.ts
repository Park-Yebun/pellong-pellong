import styled from "styled-components";

export const Container = styled.div`
    width: 360px;
    height: 800px;
    background: #FCE6B5;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
`

export const Result = styled.div`
    text-align: center;
    font-size: 36px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.036px;

    margin-top: 87px;
`

export const PlayerBox = styled.div`
    margin-top: 92px;
`

export const Player = styled.div`
    width: 314px;
    height: 132px;
    margin-bottom: 30px;
    padding-left: 35px;
    padding-right: 19px;

    border-radius: 20px;
    background: #FFF;

    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
`

export const Trophy = styled.img`
    margin-top: 5px;    
`

export const ProfileBox = styled.div`
    text-align: center;
    margin-top: 10px;
`

export const ExpBadge = styled.div`
    color: #F87370;
    text-align: center;
    font-size: 25px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.032px;
`

export const ProfileImg = styled.img`
    width: 67px;
    height: 67px;
    border-radius: 60px;
`

export const Nickname = styled.div`
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.015px;
`

export const BackBtn = styled.div`
    width: 301px;
    height: 66px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    background: #6990FF;

    color: #FFF;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.02px;

    position: absolute;
    bottom: 110px;
`