import React, { useEffect, useState} from 'react';


import './DailyQuoteNight.css';

interface Props {
    jejuProverbId: number;
    pbJeju: string;
    pbStandard: string;
}

// export const DailyQuote = ({robot} : Props) => {
export const DailyQuote = () => {
    const [ pbS, setPbS] = useState<string | null>(null);
    const [ pbJ, setPbJ] = useState<string | null>(null);
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const handleMouseOver = () => {
        setIsHidden(false);
        // console.log("마우스 오버!!")
    };

    const handleMouseOut = () => {
        setIsHidden(true);
        // console.log("마우스 아웃!!")
    };

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsHidden(!isHidden);
        // console.log("클릭!!")
    }
    useEffect(() => {
        // console.log("페치데이터 동작!!")



        const fetchDailyQuote = async () => {
            try {
                const response = await fetch('https://www.saturituri.com/api/jeju-proverb', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dailyQuote: Props  = await response.json();
                // console.log("제주", dailyQuote.pbJeju);
                // console.log("표준", dailyQuote.pbStandard);
                setPbJ(dailyQuote.pbJeju);
                setPbS(dailyQuote.pbStandard);
                // console.log("데이터 로드 완료", dailyQuote);
            } catch (error) {
                // console.log("데이터 로드 실패", error)
            }
        }
        fetchDailyQuote();
    }, []);
    return (
        <>
            <div className={isHidden ? 'daily-quote-night' : 'daily-quote2-night'} onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut}>
                {/*<h1>오늘의 속담</h1>*/}
                <h1>{pbJ}</h1>
            </div>
            <div className={!isHidden ? 'gomugomu-night' : 'gomu-night'}
            style={{textAlign: 'center',
                fontSize: '0.5rem',
                fontWeight: '500'}}
            >
                <h1>{pbS}</h1>
            </div>
        </>
    );
};

export default DailyQuote;