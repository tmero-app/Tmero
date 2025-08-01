import React, { useState, useEffect } from 'react';
import styles from './../public/scss/SignupPage.module.scss';
import TermsModal from '../components/elements/TermsModal';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        parentFullname: '',
        phoneNumber: '',
        email: '',
        password: '',
        courseId: '',
        state: '',
        studentName: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [courses, setCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [coursesError, setCoursesError] = useState('');
    // Mobile detection hook
    const [isMobile, setIsMobile] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 600);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // fetch courses from api
    useEffect(() => {
        const fetchCourses = async () => {
            setCoursesLoading(true);
            setCoursesError('');
            try {
                const response = await fetch('https://api.tmero.com/course');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const result = await response.json();
                setCourses(result.data);
            } catch (err) {
                setCoursesError('Could not load language options. Please refresh.');
            } finally {
                setCoursesLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const validateField = (name, value) => {
        if (!value) return '';  
        
        switch (name) {
            case 'parentFullname':
            case 'studentName':
                // only letters, spaces, and hyphens allowed, at least 2 characters
                if (!/^[A-Za-z\s-]{2,}$/.test(value)) {
                    return 'Name should only contain letters, spaces, and hyphens';
                }
                break;
            case 'phoneNumber': {
                // remove all non-digit characters except leading +
                let cleaned = value.replace(/[^\d+]/g, '');
                // remove all non-digits for digit count
                let digits = value.replace(/\D/g, '');
                if (digits.length < 9) {
                    return 'Phone number must have at least 9 digits';
                }
                // must start with +, 0, or digit (for country code)
                if (!/^([+]?\d{1,3})?0?\d{8,}$/.test(cleaned)) {
                    return 'Please enter a valid phone number (e.g., +251912345678, 0967455481)';
                }
                break;
            }
            case 'email':
                // email validation
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address';
                }
                break;
            case 'password':
                // password must be at least 8 characters
                if (value.length < 8) {
                    return 'Password must be at least 8 characters long';
                }
                break;
            case 'state':
                // only letters and spaces, at least 2 characters
                if (!/^[A-Za-z\s]{2,}$/.test(value)) {
                    return 'State should only contain letters and spaces';
                }
                break;
            case 'courseId':
                if (!value) {
                    return 'Please select a language course';
                }
                break;
            default:
                return '';
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // only validate if field has been touched
        if (touchedFields[name]) {
            const error = validateField(name, value);
            setFormErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));
        const error = validateField(name, value);
        setFormErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // mark all fields as touched
        const allTouched = Object.keys(formData).reduce((acc, key) => ({
            ...acc,
            [key]: true
        }), {});
        setTouchedFields(allTouched);

        // validate all fields before submission
        const errors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                errors[key] = 'This field is required';
            } else {
                const error = validateField(key, formData[key]);
                if (error) {
                    errors[key] = error;
                }
            }
        });

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setLoading(true);
        setError('');

        const updatedFormData = {
            ...formData,
            courses: [Number(formData.courseId)],
        };
        delete updatedFormData.courseId;

        try {
            const response = await fetch('https://api.tmero.com/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }

            const data = await response.json();
            localStorage.setItem('registrationToken', data.data);
            localStorage.setItem('signupData', JSON.stringify(updatedFormData));
            window.location.href = '/payment';
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.message || 'There was a problem signing up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signupPageWrapper}>
            <div className={styles.overlay}></div>
            <section className={styles.signupSectionCentered}>
                <div className={styles.signupContainer}>
                    {/* Title Column */}
                    <div className={styles.signupTitleColumn}>
                        <div className={styles.signupTitle}>
                            <h2>Join Tmero Today</h2>
                            <div className={styles.signupDescription}>
                                {isMobile
                                    ? 'Unlock language learning for your child.'
                                    : 'Unlock a world of language learning for your child with our interactive and engaging platform.'
                                }
                            </div>
                        </div>

                        <ul className={styles.featuresList}>
                            <li>
                                <div className={styles.featureIcon}>🎯</div>
                                <div className={styles.featureText}>
                                    <h3>Personalized Learning</h3>
                                    <p>{isMobile ? "Live online classes for kids" : "Live online classes with expert teachers, specially designed for children's learning needs"}</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.featureIcon}>🌟</div>
                                <div className={styles.featureText}>
                                    <h3>Interactive Lessons</h3>
                                    <p>{isMobile ? "Fun, interactive lessons" : "Engaging activities and games that make learning fun and effective"}</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.featureIcon}>📊</div>
                                <div className={styles.featureText}>
                                    <h3>Progress Tracking</h3>
                                    <p>{isMobile ? "Track your child's progress" : "Monitor your child's achievements and learning journey"}</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.featureIcon}>🌍</div>
                                <div className={styles.featureText}>
                                    <h3>Cultural Immersion</h3>
                                    <p>{isMobile ? "Learn with real-world context" : "Learn language through cultural context and real-world scenarios"}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Form Column */}
                    <div className={styles.signupFormColumn}>
                        <div className={styles.signupFormInner}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <input 
                                        type="text" 
                                        name="parentFullname" 
                                        placeholder="Parent Full Name" 
                                        required 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={touchedFields.parentFullname && formErrors.parentFullname ? styles.error : ''}
                                    />
                                    {touchedFields.parentFullname && formErrors.parentFullname && (
                                        <div className={styles.fieldError}>{formErrors.parentFullname}</div>
                                    )}
                                </div>
                                <div className={styles.formGroup}>
                                    <input 
                                        type="tel" 
                                        name="phoneNumber" 
                                        placeholder="Phone Number" 
                                        required 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={touchedFields.phoneNumber && formErrors.phoneNumber ? styles.error : ''}
                                    />
                                    {touchedFields.phoneNumber && formErrors.phoneNumber && (
                                        <div className={styles.fieldError}>{formErrors.phoneNumber}</div>
                                    )}
                                </div>
                                <div className={styles.formGroup}>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Email" 
                                        required 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={touchedFields.email && formErrors.email ? styles.error : ''}
                                    />
                                    {touchedFields.email && formErrors.email && (
                                        <div className={styles.fieldError}>{formErrors.email}</div>
                                    )}
                                </div>
                                <div className={styles.formGroup}>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Password" 
                                        required 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={touchedFields.password && formErrors.password ? styles.error : ''}
                                    />
                                    {touchedFields.password && formErrors.password && (
                                        <div className={styles.fieldError}>{formErrors.password}</div>
                                    )}
                                </div>
                                <div className={styles.formGroup}>
                                    <select
                                        name="courseId"
                                        required
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        value={formData.courseId}
                                        className={touchedFields.courseId && formErrors.courseId ? styles.error : ''}
                                        disabled={coursesLoading || coursesError}
                                    >
                                        <option value="" disabled>
                                            {coursesLoading ? 'Loading languages...' : 'Select Language'}
                                        </option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>
                                                {course.title}
                                            </option>
                                        ))}
                                    </select>
                                    {touchedFields.courseId && formErrors.courseId && (
                                        <div className={styles.fieldError}>{formErrors.courseId}</div>
                                    )}
                                    {coursesError && (
                                        <div className={styles.fieldError}>{coursesError}</div>
                                    )}
                                </div>
                                <div className={styles.formGroup}>
                                    <input 
                                        type="text" 
                                        name="state" 
                                        placeholder="State" 
                                        required 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={touchedFields.state && formErrors.state ? styles.error : ''}
                                    />
                                    {touchedFields.state && formErrors.state && (
                                        <div className={styles.fieldError}>{formErrors.state}</div>
                                    )}
                                </div>
                                <div className={styles.formGroup}>
                                    <input 
                                        type="text" 
                                        name="studentName" 
                                        placeholder="Student Name" 
                                        required 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={touchedFields.studentName && formErrors.studentName ? styles.error : ''}
                                    />
                                    {touchedFields.studentName && formErrors.studentName && (
                                        <div className={styles.fieldError}>{formErrors.studentName}</div>
                                    )}
                                </div>

                                {error && (
                                    <div className={styles.errorMessage}>
                                        <span className={styles.errorIcon}>⚠️</span>
                                        {error}
                                    </div>
                                )}

                                <div className={styles.termsContainer}>
                                    <label>
                                        By continuing, you confirm that you agree to the{' '}
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openModal();
                                            }}
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>

                                <button 
                                    className={`${styles.signupBtn} ${loading ? styles.loading : ''}`}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </button>

                                <div className={styles.signupRedirect}>
                                    Already have an account? <a href="/log-in">Log in</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <TermsModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </div>
    );
};

export default SignupPage;