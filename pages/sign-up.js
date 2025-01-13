import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './../public/scss/SignupPage.module.scss'; 

const SignupPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        parentFullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        language: '',
        state: '',
        studentName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('signupData', JSON.stringify(formData));
        router.push('/payment');
    };

    return (
        <div className={styles.signupPageWrapper}>
            <section className={styles.signupSectionCentered}>
                <div className={styles.signupContainer}>
                    {/* Title Column */}
                    <div className={styles.signupTitleColumn}>
                        <div className={styles.signupTitle}>
                            <h2>Join Tmero<br /> Unlock a World of<br /> Language Learning for<br />Your Child!</h2>
                            <div className={styles.signupDescription}>
                                Embark on an Exciting Journey of Discovery and Communication!
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className={styles.signupFormColumn}>
                        <div className={styles.signupFormInner}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <input type="text" name="parentFullName" placeholder="Parent Full Name" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <select name="language" required onChange={handleInputChange}>
                                        <option value="">Select Language</option>
                                        <option value="Afaan Oromo">Afaan Oromo</option>
                                        <option value="Amharic">Amharic</option>
                                        <option value="Somali">Somali</option>
                                        <option value="Tigrigna">Tigrigna</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="text" name="state" placeholder="State" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="text" name="studentName" placeholder="Student Name" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <button className={styles.signupBtn} type="submit">Sign Up</button>
                                </div>
                                <div className={styles.signupRedirect}>
                                    Already have an account? <a href="/log-in">Log in</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignupPage;
