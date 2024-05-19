import React, { useEffect, useState} from 'react';


import './DailyQuote.css';

interface Props {
    lifeQuoteId: number;
    lifeQuoteContent: string;
}

// export const DailyQuote = ({robot} : Props) => {
export const DailyQuote = () => {
    const [ dailyQuote, setDailyQuote] = useState<string | null>(null);
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const handleMouseOver = () => {
        setIsHidden(false);
        console.log("마우스 오버!!")
    };

    const handleMouseOut = () => {
        setIsHidden(true);
        console.log("마우스 아웃!!")
    };

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsHidden(!isHidden);
        console.log("클릭!!")
    }
    useEffect(() => {
        console.log("페치데이터 동작!!")



        const fetchDailyQuote = async () => {
            try {
                const response = await fetch('https://www.saturituri.com/api/life-quotes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dailyQuote: Props  = await response.json();
                setDailyQuote(dailyQuote.lifeQuoteContent)
                console.log("데이터 로드 완료", dailyQuote);
            } catch (error) {
                console.log("데이터 로드 실패", error)
            }
        }
        fetchDailyQuote();
    }, []);
    return (
        <>
            <div className={isHidden ? 'daily-quote' : 'daily-quote2'} onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut}>
                <h1>오늘의 명언</h1>
            </div>
            <div className={!isHidden ? 'gomugomu' : 'gomu'}>
                <p>{dailyQuote}</p>
            </div>
        </>
    );
};

export default DailyQuote;