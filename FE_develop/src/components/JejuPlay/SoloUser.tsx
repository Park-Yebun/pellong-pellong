import React, { useState } from "react";
import styled from 'styled-components';
import lifeImg from '../../assets/JejuPlay/life.png'
import deLifeImg from '../../assets/JejuPlay/loselife.png'
import profile from '../../assets/JejuPlay/profile.png'

interface Props {
    alert: string;
    lifeCnt: number;
  }

const PlayerContainer = styled.div`
    width: 270px;
    height: 120px;
    display: flex;
    position: relative;
`
const LifeBox = styled.div`
    position: absolute;
    left: 0;
    top: 40%;
`
const Life = styled.img`
    width: 45.932px;
    height: 45.932px;
    margin-right: 15px;
`
const UserInfo = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`
const ProfileImg = styled.img`
    width: 64px;
    height: 64px;
`
const Nickname = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.015px;
`
const AnswerBadge = styled.div`
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

export default function SoloUser (props: Props) {
    const validLifeCount = Math.max(0, Math.min(3, props.lifeCnt));
    const lostLifeCount = 3 - validLifeCount;
    return (
        <PlayerContainer>
            <LifeBox>
                {[...Array(validLifeCount)].map((_, index) => (
                    <Life key={index} src={lifeImg} alt="life"></Life>
                ))}
                {[...Array(lostLifeCount)].map((_, index) => (
                    <Life key={index} src={deLifeImg} alt="life"></Life>
                ))}
            </LifeBox>
            <UserInfo>
                <AnswerBadge>{props.alert}</AnswerBadge>
                <ProfileImg src={profile} alt="profile"></ProfileImg>
                <Nickname>골개비</Nickname>
            </UserInfo>
        </PlayerContainer>
    );
}