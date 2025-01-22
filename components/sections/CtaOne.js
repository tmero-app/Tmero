import Link from 'next/link';
import React from 'react';

const CtaOne = () => {
    return (
        <>
            <section className="call-to-action" style={{ backgroundImage: 'url(./images/background/1.jpg)' }}>
                <div className="anim-icons">
                    <span className="icon icon-calculator zoom-one" />
                    <span className="icon icon-pin-clip zoom-one" />
                    <span className="icon icon-dots" />
                </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="title-column col-lg-8 col-md-12">
                            <div className="inner-column">
                                <div className="sec-title light">
                                    <span className="style-font">Get your quality</span>
                                    <h1>Skills certificate <br />from the Tmero</h1>
                                    <Link href="/page-course-details" className="theme-btn btn-style-one"><span className="btn-title">Get started now</span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="image-column col-lg-4 col-md-12">
                            <figure className="image"><img src="images/resource/certificate.png" title="Tmero" /></figure>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CtaOne;