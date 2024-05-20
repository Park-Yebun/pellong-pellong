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
    height: 135px;
    display: flex;
    justify-content: space-between;
    position: relative;
`
const LifeBox = styled.div``
const Life = styled.img`
    width: 19.545px;
    height: 19.545px;
    margin-right: 5px;
`
const UserInfo= styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
`

const MyInfo= styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`

const ProfileImg = styled.img`
    width: 64px;
    height: 64px;
`
const Nickname = styled.div`
    width: 64px;
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

export default function DuelUser() {
    return (
        <PlayerContainer>
            <UserInfo>
                <AnswerBadge>정답!</AnswerBadge>
                <ProfileImg src={profile} alt="profile"></ProfileImg>
                <Nickname>골개비</Nickname>
                <LifeBox>
                    <Life src={lifeImg} alt="life"></Life>
                    <Life src={lifeImg} alt="life"></Life>
                    <Life src={lifeImg} alt="life"></Life>
                </LifeBox>
            </UserInfo>
            <MyInfo>
                <AnswerBadge>오답!</AnswerBadge>
                <ProfileImg src={profile} alt="profile"></ProfileImg>
                <Nickname>골개비</Nickname>
                <LifeBox>
                    <Life src={lifeImg} alt="life"></Life>
                    <Life src={lifeImg} alt="life"></Life>
                    <Life src={lifeImg} alt="life"></Life>
                </LifeBox>
            </MyInfo>
        </PlayerContainer>
    );
}