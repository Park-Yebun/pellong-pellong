import styled from "styled-components";

interface TimerProps {
    width: number,
    count: number
  }

export const Container = styled.div`
    // width: 360px;
    height: 800px;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: #FCE6B5;
`

export const TimerBox = styled.div`
    width: 300px;
    height: 6px;
    margin-top: 60px;

    border-radius: 12px;
    background: var(--Light-gray, #E2E5E9);
`

export const Timer = styled.div<TimerProps>`
    height: 6px;

    background: ${props => props.count <= 3 ? "#F52C1F" : "#F5CA1F"};
    width: ${props => props.width}%;
    transition: background-color 1s, width 1s ease;
`

export const Description = styled.div`
    width: 302px;
    height: 117px;
    margin-top: 70px;

    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 30px; /* 150% */
    letter-spacing: 0.02px;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
    
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
`

export const ExampleBox = styled.div`
    width: 302px;
    margin-top: 45px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
`

export const CheckBadge = styled.img`
    width: 28px;
    height: 28px;
`

export const Example = styled.div`
    width: 142px;
    height: 117px;

    margin-bottom: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.02px;
`

export const ExampleImg = styled.img`
    width: 142px;
    height: 117px;

    box-sizing: border-box;
    padding: 10px;

    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const PlayerBox = styled.div`
    display: flex;
    flex-direction: row;

    margin-top: 42px;

    & > :nth-child(2) {
        margin-top: 19px;
    }

    & > :nth-child(3) {
        margin-top: 12px;
    }

    & > :last-child {
        margin-top: 12px;
    }
        
    & > div:not(:last-child) {
        margin-right: 24px;
    }
`

export const Player = styled.div`
    position: relative;
`

export const ExpBadge = styled.div`
    position: absolute;
    top: -23px;
    left: -37px;

    color: #F5002C;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.02px;
`

export const ProfileImg = styled.img`
    width: 58px;
    height: 58px;

    border-radius: 100px;
`

export const Nickname = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.015px;
`