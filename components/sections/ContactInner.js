import React, { useState } from 'react';
import Link from 'next/link';

const ContactInner = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            await fetch("https://formsubmit.co/ajax/ananastech5@gmail.com", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });

            setIsSubmitted(true);
            form.reset();
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    return (
        <>
            <section className="contact-details">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-6">
                            <div className="sec-title">
                                <span className="sub-title">Send us email</span>
                                <h2>Feel free to write</h2>
                            </div>

                            <div className="signup-form">
                                {isSubmitted ? (
                                    <div
                                        className="success-message"
                                        style={{
                                            padding: "20px",
                                            backgroundColor: "#d4edda",
                                            borderRadius: "8px",
                                            color: "#155724",
                                            transition: "opacity 0.8s ease",
                                        }}
                                    >
                                        🎉 Thank you! Your message has been sent. We'll be in touch soon.
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit}>
                                        {/* Disable default captcha */}
                                        <input type="hidden" name="_captcha" value="false" />

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="mb-3">
                                                    <input name="form_name" className="form-control" type="text" placeholder="Enter Name" required />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-3">
                                                    <input name="form_email" className="form-control required email" type="email" placeholder="Enter Email" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="mb-3">
                                                    <input name="form_subject" className="form-control required" type="text" placeholder="Enter Subject" required />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-3">
                                                    <input name="form_phone" className="form-control" type="text" placeholder="Enter Phone" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <textarea name="form_message" className="form-control required" rows="7" placeholder="Enter Message" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <button type="submit" className="theme-btn btn-style-one me-3" data-loading-text="Please wait..."><span className="btn-title">Send message</span></button>
                                            <button type="reset" className="theme-btn btn-style-one bg-theme-color5"><span className="btn-title">Reset</span></button>
                                        </div>
                                    </form>
                                )}
                            </div>

                        </div>
                        <div className="col-xl-5 col-lg-6">
                            <div className="contact-details__right mt-md-50">
                                <div className="sec-title">
                                    <span className="sub-title">Need any help?</span>
                                    <h2>Get in touch with us</h2>
                                    <div className="text">We're always here to assist you! Whether you need more information about our courses, have questions, or require support, don’t hesitate to contact us. Our team is ready to help you every step of the way.</div>
                                </div>
                                <ul className="list-unstyled contact-details__info">
                                    <li>
                                        <div className="icon bg-theme-color2">
                                            <span className="lnr-icon-phone-plus"></span>
                                        </div>
                                        <div className="text">
                                            <h6>Have any question?</h6>
                                            <a href="tel:+12067596659"><span>Free</span> +1 (206) 759-6659 </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="lnr-icon-envelope1"></span>
                                        </div>
                                        <div className="text">
                                            <h6>Write email</h6>
                                            <a href="mailto:ask@tmero.com">ask@tmero.com</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="lnr-icon-location"></span>
                                        </div>
                                        <div className="text">
                                            <h6>Visit anytime</h6>
                                            <span>International Mall, 20804 International<br /> Blvd, SeaTac, WA 98198 </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container-fluid p-0">
                    <div className="row">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10799.329160529745!2d-122.2969373!3d47.4152123!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54905ba6f520b465%3A0xb1d2a9b6591d2ea4!2sSeaTac%20International%20Mall!5e0!3m2!1sen!2set!4v1729610925258!5m2!1sen!2set" data-tm-width="100%" height="500" allowFullScreen="" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactInner;
