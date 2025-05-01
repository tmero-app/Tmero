import React from 'react';
import CountDown from '../elements/CountDown';


const eventData = {
    title: 'Next Class Starts Soon',
    subtitle: 'Get ready to learn',
    dateString: '2025-06-01T00:00:00', 
};

const CountdownOne = () => {
    const startDate = new Date(eventData.dateString);
    const formattedDate = startDate.toLocaleDateString('en-US', {
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
                        <span className="sub-title">{eventData.subtitle}</span>
                        <h2>{eventData.title}</h2>
                        <p 
                            style={{ 
                                fontSize: '0.9rem', 
                                marginTop: '0.5rem', 
                                color: '#ffffff', 
                            }}
                            className="formatted-date"
                        >
                            Starting on: {formattedDate}
                        </p>
                    </div>
                    <div className="time-counter wow fadeInUp">
                        <CountDown endDateTime={startDate} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CountdownOne;
