import React from 'react';
import CountDown from '../elements/CountDown';

const CountdownOne = () => {
    // Get current date/time in US Eastern Time
    const now = new Date();
    const usTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );

    // Set next midnight in US time
    const nextMidnight = new Date(usTime);
    nextMidnight.setHours(24, 0, 0, 0); // 24:00 today = 00:00 tomorrow

    // Format for display
    const formattedDate = nextMidnight.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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
                        <CountDown endDateTime={nextMidnight} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CountdownOne;
