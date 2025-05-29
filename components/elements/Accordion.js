import React, { useState } from 'react';

const Accordion = () => {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    });

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };
    return (
        <>


            <ul className="accordion-box wow fadeInRight">
                {/*Block*/}
                <li className={isActive.key == 1 ? "accordion block active-block" : "accordion block"} onClick={() => handleToggle(1)}>
                    <div className={isActive.key == 1 ? "acc-btn active" : "acc-btn"}>Is my child’s progress tracked on the platform? 
                        <div className="icon fa fa-angle-down" />
                    </div>
                    <div className={isActive.key == 1 ? "acc-content current" : "acc-content"}>
                        <div className="content">
                            <div className="text">Yes, our platform includes a progress tracker for each course. Parents and learners can easily monitor completed lessons, quiz results, and overall improvement over time. </div>
                        </div>
                    </div>
                </li>
                {/*Block*/}
                <li className={isActive.key == 2 ? "accordion block active-block" : "accordion block"} onClick={() => handleToggle(2)}>
                    <div className={isActive.key == 2 ? "acc-btn active" : "acc-btn"}>What languages can my child learn on the platform?
                        <div className="icon fa fa-angle-down" />
                    </div>
                    <div className={isActive.key == 2 ? "acc-content current" : "acc-content"}>
                        <div className="content">
                            <div className="text">We offer courses in Somali, Amharic, Afaan Oromo, Tigrigna and Swahili. Each course is designed to make language learning engaging and culturally enriching for young learners.</div>
                        </div>
                    </div>
                </li>
                {/*Block*/}
                <li className={isActive.key == 3 ? "accordion block active-block" : "accordion block"} onClick={() => handleToggle(3)}>
                    <div className={isActive.key == 3 ? "acc-btn active" : "acc-btn"}>How interactive are the lessons?
                        <div className="icon fa fa-angle-down" />
                    </div>
                    <div className={isActive.key == 3 ? "acc-content current" : "acc-content"}>
                        <div className="content">
                            <div className="text">Our lessons are highly interactive, including fun games, quizzes, video lessons, and real-world activities that help children apply what they've learned in a practical, enjoyable way.</div>
                        </div>
                    </div>
                </li>
                {/*Block*/}
                <li className={isActive.key == 4 ? "accordion block active-block" : "accordion block"} onClick={() => handleToggle(4)}>
                    <div className={isActive.key == 4 ? "acc-btn active" : "acc-btn"}>Do you offer live support for parents?
                        <div className="icon fa fa-angle-down" />
                    </div>
                    <div className={isActive.key == 4 ? "acc-content current" : "acc-content"}>
                        <div className="content">
                            <div className="text">Yes, we provide live video / call support for parents to assist with technical issues, course questions, or anything else related to your child's learning experience.</div>
                        </div>
                    </div>
                </li>
                {/*Block*/}
                <li className={isActive.key == 5 ? "accordion block active-block" : "accordion block"} onClick={() => handleToggle(5)}>
                    <div className={isActive.key == 5 ? "acc-btn active" : "acc-btn"}>Can we access the courses on multiple devices? 
                        <div className="icon fa fa-angle-down" />
                    </div>
                    <div className={isActive.key == 5 ? "acc-content current" : "acc-content"}>
                        <div className="content">
                            <div className="text">Absolutely! Our platform is compatible with desktops, tablets, and mobile devices, allowing you and your child to learn from anywhere, at any time.</div>
                        </div>
                    </div>
                </li>

            </ul>
        </>
    );
};

export default Accordion;