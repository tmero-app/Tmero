import Link from 'next/link';
import React from 'react';

const AboutOne = () => {
    return (
        <>
            <section className="about-section">
                <div className="anim-icons">
                    <span className="icon icon-dotted-map" />
                </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="content-column col-lg-6 col-md-12 order-2 wow fadeInRight" data-wow-delay="600ms">
                            <div className="inner-column">
                                <div className="sec-title">
                                    <span className="sub-title">Get to know us</span>
                                    <h2>Grow your skills learn with us from anywhere</h2>
                                    <div className="text">At Tmero, we believe that language is more than just words, It's a bridge to culture, connection, and character building. Imagine having a heartfelt conversation with your kids in your native language, strengthening bonds and creating memories that will last a lifetime.
With expert trainers and interactive lessons, your child will not only learn how to communicate but will also cultivate a deep appreciation for their roots. Through fun games, engaging activities, and real-world applications, we ensure that language learning is both meaningful and rewarding. </div>
                                </div>
                                <ul className="list-style-one two-column">
                                    <li><i className="icon fa fa-check" /> Expert trainers</li>
                                    <li><i className="icon fa fa-check" /> Online learning</li>
                                    <li><i className="icon fa fa-check" /> Good character build</li>
                                    <li><i className="icon fa fa-check" /> Great results</li>
                                </ul>
                                <div className="btn-box">
                                    <Link href="/page-about" className="theme-btn btn-style-one"><span className="btn-title">Discover more</span></Link>
                                </div>
                            </div>
                        </div>
                        {/* Image Column */}
                        <div className="image-column col-lg-6 col-md-12">
                            <div className="anim-icons">
                                <span className="icon icon-dotted-map-2" />
                                <span className="icon icon-paper-plan" />
                                <span className="icon icon-dotted-line" />
                            </div>
                            <div className="inner-column wow fadeInLeft">
                                <figure className="image-1 overlay-anim wow fadeInUp"><img src="images/resource/learning-family.webp" title="Tmero" /></figure>
                                {/* <figure className="image-2 overlay-anim wow fadeInRight"><img src="images/resource/about-2.jpg" title="Tmero" /></figure> */}
                                <div className="experience bounce-y">Bond Through Language, Connect for Life</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutOne;