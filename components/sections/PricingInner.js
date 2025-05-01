import Link from 'next/link';
import React from 'react';

const PricingOne = () => {
    return (
        <>
            <section className="pricing-section">
                <div className="anim-icons">
                    <span className="icon icon-group-1 bounce-y" />
                    <span className="icon icon-group-2 bounce-y" />
                </div>
                <div className="auto-container">
                    <div className="row">
                        {/* Centered Pricing Block */}
                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12 mx-auto" style={{  maxWidth: '800px', width: '100%'  }}>
                            <div className="inner-box">
                                <div className="price-box">
                                    {/* <h1 className="price text-center">$20.00</h1> */}
                                    <h1><span className="title">📚 What You’ll Gain</span></h1>
                                </div>
                                <ul className="features">
                                    <li>🧠 Build Genuine Communication with Your Children — Strengthen understanding, trust, and emotional connection</li>
                                    <li>🎓 Led by University-Level Instructors — Learn by experts from the University of Washington.</li>
                                    <li>💸 Money-Back Rewards for Top Students — Show your commitment and you may earn a full refund.</li>
                                    <li>📅 4.37 Months / 19 Weeks of Guided, Practical Lessons — A step-by-step program covering core parenting skills.</li>
                                    <li>🧩 Modern, Fun Teaching Methods — Interactive trivia, relatable examples, and playful learning.</li>
                                    <li>⭐ 5/5 Rating from Parents — Reviewed and recommended by families who’ve taken the course.</li>
                                    <li>💬 Live Q&A + Parent Community Access — Connect, share, and ask questions in a safe, supportive space.</li>
                                    <li>📚 Free Access to All Webinar Classes — One payment, lifetime access — no surprises, no extra fees.</li>
                                </ul>
                                {/* <div className="btn-box">
                                    <Link href="/page-pricing" className="theme-btn btn-style-one">
                                        <span className="btn-title">Choose Plan</span>
                                    </Link>
                                    <span className="sub-title">No hidden charges!</span>
                                </div> */}
                            </div>
                        </div>
                        {/* end single Pricing Block */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingOne;
