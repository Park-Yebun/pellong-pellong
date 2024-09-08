import React, { useEffect, useState} from 'react';
import { useErrorBoundary } from "react-error-boundary";

import './DailyQuote.css';
import axios from 'axios';
import { error } from 'console';

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
    const { showBoundary } = useErrorBoundary();

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
    // useEffect(() => {
    //     axios.get('http://localhost:8080/jeju-proverb')
    //     .then((response) => {
    //         setPbJ(response.data.pbJeju);
    //         setPbS(response.data.pbStandard);
    //     })
    //     .catch((error) => {
    //         showBoundary(error);
    //     })
    // }, []);
    return (
        <>
            <div className={isHidden ? 'daily-quote' : 'daily-quote2'} onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut}>
                {/*<h1>오늘의 속담</h1>*/}
                <h1>{pbJ}</h1>
            </div>
            <div className={!isHidden ? 'gomugomu' : 'gomu'}
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