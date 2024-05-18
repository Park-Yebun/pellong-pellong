import React from 'react';




interface Props {
    robot: string;
}

export const DailyQuote = ({robot} : Props) => {
    return (
        <div>
            <h1>로봇의 이름: {robot}</h1>
        </div>
    );
};