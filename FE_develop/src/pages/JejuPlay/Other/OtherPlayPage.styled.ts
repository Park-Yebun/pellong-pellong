import styled from 'styled-components'

export const Container = styled.div`
    width: 360px;
    height: 800px;
    background: #FCE6B5;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StageBox = styled.div`
    position: relative;
`

export const Stage = styled.img``

export const StageText = styled.div`
    position: absolute;
    top: 45px;
    left: 59px;

    color: #000;
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.032px;
`

export const Hint = styled.div`  
    width: 69px;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50px;
    background: #B4D2D4;

    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
`

export const QuizBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

export const TypeBadge = styled.img`
    position: absolute;
    z-index: 1;

`

export const Content = styled.div`
    width: 302px;
    height: 245px;

    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; /* 125% */
    letter-spacing: 0.024px;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
`

export const AnswerBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 22px;
`

export const MandarinBadge = styled.img`
    width:125px;
    height:76px;
    margin-left: 200px;
`

export const Answer = styled.input`
    width: 270px;
    height: 75px;
    text-align: center;

    border: none;
    outline: none;
    border-radius: 5px;
    background: #FFFBF6;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const Alert = styled.div`
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

export const PlayerBox = styled.div`
    width: 270px;
    height: 135px;
    display: flex;
    justify-content: space-between;
    position: relative;
`
export const LifeBox = styled.div``
export const Life = styled.img`
    width: 19.545px;
    height: 19.545px;
    margin-right: 5px;
`
export const Player= styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
`

export const ProfileImg = styled.img`
    width: 64px;
    height: 64px;
    border-radius: 60px;
`
export const Nickname = styled.div`
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