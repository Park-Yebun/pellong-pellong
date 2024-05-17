import styled from "styled-components";

export const Container = styled.div`
    width: 360px;
    min-height: 800px;
    background: #FCE6B5;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Result = styled.div`
    position: absolute;
    top: 40px;

    font-size: 36px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.036px;
`

export const PlayerBox = styled.div`
    position: absolute;
    top: 100px;
`

export const Player = styled.div`
    box-sizing: border-box;
    width: 314px;
    height: 132px;
    padding-left: 37px;
    padding-right: 37px;
    
    margin-top: 10px;

    border-radius: 20px;
    background: #FFF;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Trophy = styled.img`
    width: 89.551px;
    height: 134px;
`

export const ProfileBox = styled.div``

export const ExpBadge = styled.div``

export const ProfileImg = styled.div`
    width: 67px;
    height: 67px;
    border-radius: 60px;
    background: #FCE6B5;
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
    position: absolute;
    bottom: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    background: #6990FF;

    color: #FFF;

    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.02px;
`