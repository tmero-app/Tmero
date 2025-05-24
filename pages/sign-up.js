import React, { useState } from 'react';
import styles from './../public/scss/SignupPage.module.scss'; 

const SignupPage = () => {
    const [formData, setFormData] = useState({
        parentFullname: '',
        phoneNumber: '',
        email: '',
        password: '',
        courses: '', 
        state: '',
        studentName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Map selected language to course ID
        let courseId = null;
        switch (formData.courses) {
            case 'Afaan Oromo':
                courseId = 5;
                break;
            case 'Amharic':
                courseId = 3;
                break;
            case 'Somali':
                courseId = 4;
                break;
            case 'Tigrigna':
                courseId = 6;
                break;
            default:
                break;
        }
    
        const updatedFormData = {
            ...formData,
            courses: [courseId],
        };
    
        try {
            const response = await fetch('https://api.tmero.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });
    
            if (!response.ok) throw new Error('Registration failed');
    
            const data = await response.json();
    
            // Store the token returned by backend
            localStorage.setItem('registrationToken', data.data); 
            localStorage.setItem('signupData', JSON.stringify(updatedFormData));
    
            // Redirect to payment page
            window.location.href = '/payment';
        } catch (error) {
            console.error('Signup error:', error);
            alert('There was a problem signing up. Please try again.');
        }
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
                                    <input type="text" name="parentFullname" placeholder="Parent Full Name" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                <input type="tel" name="phoneNumber" placeholder="Phone Number" pattern="^\+?[1-9]\d{1,14}$" title="Enter a valid international phone number (e.g., +14155552671)" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                <input type="email" name="email" placeholder="Email" title="Please enter a valid email address" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <select name="courses" required onChange={handleInputChange}>
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
