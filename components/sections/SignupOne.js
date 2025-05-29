import React, { useState } from 'react';

const SignupOne = () => {
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
        <section className="signup-section">
            <div className="auto-container">
                <div className="anim-icons">
                    <span className="icon icon-paper-clip bounce-x" />
                </div>
                <div className="outer-box" style={{ backgroundImage: 'url(./images/background/3.jpg)' }}>
                    <span className="float-icon icon-pencil-line wow fadeInUp" />
                    <div className="row">
                        {/* Title Column */}
                        <div className="title-column col-lg-6 col-md-12 col-sm-12">
                            <div className="sec-title light">
                                <h2>Sign up for a<br /> free trial lesson<br /> by zoom</h2>
                                <div className="text">Discover engaging language learning that connects your child to culture, communication, and confidence.</div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="form-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="signup-form wow fadeInLeft">
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
                                            🎉 Thank you! Your request has been received. We'll be in touch soon.
                                        </div>
                                    ) : (
                                        <form onSubmit={handleFormSubmit}>
                                            <input type="hidden" name="_captcha" value="false" />

                                            <div className="form-group">
                                                <input type="text" name="full_name" placeholder="Your name" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" name="email" placeholder="Email address" required />
                                            </div>
                                            <div className="form-group">
                                                <select className="custom-select" name="course" required>
                                                    <option value="">Select course</option>
                                                    <option value="Amharic">Amharic</option>
                                                    <option value="Somali">Somali</option>
                                                    <option value="Tigrigna">Tigrigna</option>
                                                    <option value="Afaan Oromo">Afaan Oromo</option>
                                                    <option value="Swahili">Swahili</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <button className="theme-btn btn-style-one" type="submit" name="submit-form">Send Request</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupOne;
