import styled from "styled-components";

export const Container = styled.div`
    width: 360px;
    min-height: 800px;
    background: #FCE6B5;

    position: relative;
`

export const GameOver = styled.div`
    position: absolute;
    top: 87px;
    left: 110px;

    font-size: 36px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.036px;
`

export const Winner = styled.div`
    position: absolute;
    top: 164px;
    left: 129px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Loser = styled.div`
    position: absolute;
    top: 532px;
    left: 110px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Trophy = styled.img``

export const ProfileBox = styled.div`
    margin-top: 45px;
`

export const ProfileImg = styled.img`
    width: 67px;
    height: 67px;
    border-radius: 60px;
    background: #FFF;
`

export const Nickname = styled.div`
    margin-top: 13px;

    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.015px;
`

export const Exp = styled.div`
    margin-top: 7px;

    color: #F87370;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.016px;
`

export const Lose = styled.img``
