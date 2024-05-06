import styled from 'styled-components';
import background from '../../assets/JejuPlay/background.png'

export const Container = styled.div`
    width: 360px;
    height: 800px;
    position: relative;

    background: #E9FFD9 url(${background}) center center / cover no-repeat;
    background-size: 360px 183px;
    background-position: center 617px;
`

export const CreateBox = styled.div`
    width: 277px;
    height: 490px;

    position: absolute;
    top: 69px;
    left: 41.5px;

    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const CloseBtn = styled.img`
    position: absolute;
    top: 8px;
    right: 8px;

    cursor: pointer;
`

export const SpeedQuizImg = styled.img`
    position: absolute;
    top: 8px;
    left: 38.5px;
`

export const OptionGroup = styled.div`
    position: absolute;
    top: 208px;
    left: 30px;

    display: flex;
    flex-direction: column;
    text-align: center;
`

export const Text = styled.div`
    margin-top: 10px;

    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    letter-spacing: 0.1px;
`

export const Title = styled.input`
    width: 212px;
    height: 26px;
    text-align: center;

    border: none;
    border-radius: 20px;
    background: #E4F1FF;
`

export const Capacity = styled.select`
    width: 212px;
    height: 26px;
    text-align: center;

    border: none;
    border-radius: 20px;
    background: #E4F1FF;
`

export const Option = styled.option``

export const Password = styled.input`
    width: 212px;
    height: 26px;
    text-align: center;

    border: none;
    border-radius: 20px;

    &:disabled {
        background: #D9D9D9;
    }

    &:not(:disabled) {
        background: #E4F1FF;
    }
`

export const Switch = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
`

export const IsPublic = styled.input`
    display: none;
`

export const Slider = styled.span`
display: block;
position: relative;
width: 48px;
height: 25px;
background-color: #EFEFEF;
border-radius: 50px;
box-shadow: 0px 6px 8px 3px rgba(0, 0, 0, 0.10) inset;

&:after {
    content: "";
    position: absolute;
    right: 23px;
    width: 25px;
    height: 25px;
    background: linear-gradient(180deg, #FFF 0%, #E8EAEA 100%);
    border-radius: 50%;
    transition: all .4s;
    box-shadow: 0px 6px 8px 3px rgba(0, 0, 0, 0.10) inset;
}

${IsPublic}:checked + & {
    background-color: #49C1D6;
}

${IsPublic}:checked + &:after {
    right: 0;
}
`

export const CreateBtn = styled.div`
    width: 129px;
    height: 49px;

    position: absolute;
    top: 596px;
    left: 115.5px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    background: #D9D9D9;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    color: #FFF;
    -webkit-text-stroke-width: 0.5;
    -webkit-text-stroke-color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 133.333% */
    letter-spacing: 0.1px;
`
