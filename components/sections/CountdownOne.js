import React from 'react';
import { DateTime } from 'luxon';
import CountDown from '../elements/CountDown';

const CountdownOne = () => {
    const nowInNY = DateTime.now().setZone('America/New_York');
    const nextMidnightInNY = nowInNY.plus({ days: 1 }).startOf('day');
    const endDateTime = nextMidnightInNY.toJSDate();
    const formattedDate = nextMidnightInNY.toFormat('cccc, LLLL d, yyyy');

    return (
        <section className="countdown-section">
            <div
                className="bg-image zoom-two"
                style={{ backgroundImage: 'url(./images/background/2.jpg)' }}
            />
            <div className="auto-container">
                <div className="content-box">
                    <div className="sec-title light text-center">
                        <span className="sub-title">Next Class Starts Soon</span>
                        <h2>Time is ticking — reserve your place now</h2>
                        {/* <p 
                            style={{ 
                                fontSize: '0.9rem', 
                                marginTop: '0.5rem', 
                                color: '#ffffff', 
                            }}
                            className="formatted-date"
                        >
                            Resets daily at: {formattedDate}
                        </p> */}
                    </div>
                    <div className="time-counter wow fadeInUp">
                        <CountDown endDateTime={endDateTime} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CountdownOne;
