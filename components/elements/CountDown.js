import React, { useEffect, useState } from "react";

const msInSecond = 1000;
const msInMinute = 60 * 1000;
const msInAHour = 60 * msInMinute;
const msInADay = 24 * msInAHour;

const getPartsofTimeDuration = (duration) => {
    const days = Math.floor(duration / msInADay);
    const hours = Math.floor((duration % msInADay) / msInAHour);
    const minutes = Math.floor((duration % msInAHour) / msInMinute);
    const seconds = Math.floor((duration % msInMinute) / msInSecond);

    return { days, hours, minutes, seconds };
};

const CountDown = ({ endDateTime }) => {
    const [timeParts, setTimeParts] = useState(() => {
        const now = Date.now();
        const future = new Date(endDateTime);
        return getPartsofTimeDuration(future.getTime() - now);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const future = new Date(endDateTime);
            setTimeParts(getPartsofTimeDuration(future.getTime() - now));
        }, 1000);

        return () => clearInterval(interval);
    }, [endDateTime]);

    return (
        <div className="time-countdown">
            <div className="counter-column">
                <span className="count">{timeParts.days}</span>
                <span className="title">Days</span>
            </div>
            <div className="counter-column">
                <span className="count">{timeParts.hours}</span>
                <span className="title">Hours</span>
            </div>
            <div className="counter-column">
                <span className="count">{timeParts.minutes}</span>
                <span className="title">Minutes</span>
            </div>
            <div className="counter-column">
                <span className="count">{timeParts.seconds}</span>
                <span className="title">Seconds</span>
            </div>
        </div>
    );
};

export default CountDown;
