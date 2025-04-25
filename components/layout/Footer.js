import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <>

            <footer className="main-footer">
                <div className="bg-image zoom-two" style={{ backgroundImage: 'url(./images/background/4.jpg)' }} />
                {/*Widgets Section*/}
                <div className="widgets-section">
                    <div className="auto-container">
                        <div className="row">
                            {/*Footer Column*/}
                            <div className="footer-column col-xl-3 col-lg-12 col-md-6 col-sm-12">
                                <div className="footer-widget about-widget">
                                    <div className="logo"><Link href="/"><img src="images/logo-2.png" title="Tmero" /></Link></div>
                                    <div className="text">Best online language courses from us</div>
                                    <ul className="social-icon-two">
                                        <li><a href="https://www.facebook.com/profile.php?id=61570942204502" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" /></a></li>
                                        <li><a href="https://www.instagram.com/tmeroedu/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a></li>
                                        <li><a href="https://wa.me/+12067596659" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /></a></li>
                                        <li><a href="https://www.tiktok.com/@tmero.com" target="_blank" rel="noopener noreferrer"><img src="/images/icons/tiktok.svg" style={{ width: '19px', height: '19px'}} /></a></li>
                                        <li><a href="https://t.me/tmeroedu" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            {/*Footer Column*/}
                            <div className="footer-column col-xl-2 col-lg-4 col-md-6 col-sm-12">
                                <div className="footer-widget">
                                    <h4 className="widget-title">Explore</h4>
                                    <ul className="user-links">
                                        <li><Link href="#">Gallery</Link></li>
                                        <li><Link href="/news-grid">News &amp; Articles</Link></li>
                                        <li><Link href="/page-faq">FAQ's</Link></li>
                                        <li><Link href="/log-in">Sign In/Registration</Link></li>
                                        <li><Link href="/page-coming-soon">Coming Soon</Link></li>
                                        <li><Link href="/page-contact">Contacts</Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/*Footer Column*/}
                            <div className="footer-column col-xl-2 col-lg-4 col-md-6 col-sm-12">
                                <div className="footer-widget">
                                    <h4 className="widget-title">Links</h4>
                                    <ul className="user-links">
                                        <li><Link href="/page-about">About</Link></li>
                                        <li><Link href="/page-courses">Courses</Link></li>
                                        <li><Link href="/page-team">Instructor</Link></li>
                                        <li><Link href="#">Events</Link></li>
                                        <li><Link href="/page-team">Instructor Profile</Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/*Footer Column*/}
                            <div className="footer-column col-xl-5 col-lg-4 col-md-6 col-sm-12">
                                <div className="footer-widget contact-widget">
                                    <h4 className="widget-title">Contact</h4>
                                    <div className="widget-content">
                                        <ul className="contact-info">
                                            <li><i className="fa fa-phone-square" /> <Link href="tel:206-759-6659">206-759-6659</Link></li>
                                            <li><i className="fa fa-envelope" /> <Link href="mailto:info@tmero.com">info@tmero.com</Link></li>
                                            <li><i className="fa fa-map-marker-alt" /> Seattle, WA</li>
                                        </ul>
                                        <div className="subscribe-form">
                                            <form method="post" action="#">
                                                <div className="form-group">
                                                    <input type="email" name="email" className="email" placeholder="Email Address" required />
                                                    <button type="button" className="theme-btn btn-style-one"><i className="fa fa-long-arrow-alt-right" /></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Footer Bottom*/}
                <div className="footer-bottom">
                    <div className="auto-container">
                        <div className="inner-container">
                            <div className="copyright-text">© Copyright 2024 by  <Link href="/">Tmero.com</Link></div>
                        </div>
                    </div>
                </div>
            </footer>



        </>
    );
};

export default Footer;