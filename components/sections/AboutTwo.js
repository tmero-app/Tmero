import React from 'react';

const AboutTwo = () => {
    return (
        <>
            <section className="about-section-two">
                <div className="anim-icons">
                    {/* <span className="icon icon-e wow zoomIn" /> */}
                    <span className="icon icon-dots-2 bounce-x" />
                </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="content-column col-lg-6 col-md-12 order-2 wow fadeInRight" data-wow-delay="600ms">
                            <div className="inner-column">
                                <div className="sec-title">
                                    <h2>Experience in distant learning for skills</h2>
                                    <div className="text">We've been providing quality distance learning programs designed to help students build essential language skills. Our approach blends engaging lessons, expert instruction, and a flexible structure, ensuring every learner achieves their goals and stays connected to their cultural roots.</div>
                                </div>
                                <div className="row">
                                    <div className="about-block col-lg-6 col-md-6 col-sm-6 wow fadeInUp">
                                        <div className="inner-box">
                                            <span className="info-text">Top Language Learning Experience</span>
                                            <div className="info-box">
                                                <div className="thumb"><img src="images/resource/selim.webp" title="Tmero" /></div>
                                                <h5 className="name">Selim</h5>
                                                <span className="designation">Student</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="about-block style-two col-lg-6 col-md-6 col-sm-6 wow fadeInRight">
                                        <div className="inner-box">
                                            <span className="info-text">Outstanding Language Program</span>
                                            <div className="info-box">
                                                <div className="thumb"><img src="images/resource/elias.webp" title="Tmero" /></div>
                                                <h5 className="name">Elias M.</h5>
                                                <span className="designation">TEACHER</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Image Column */}
                        <div className="image-column col-lg-6 col-md-12">
                            <div className="inner-column wow fadeInLeft">
                                <div className="icons-box">
                                    <span className="icon icon-dotted-map" />
                                    <span className="icon icon-dotted-line" />
                                    <span className="icon icon-papper-plan" />
                                </div>
                                <figure className="image overlay-anim wow fadeInUp"><img src="images/resource/child.webp" title="Tmero" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutTwo;