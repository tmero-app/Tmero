import React, { useState } from 'react';
import styles from './../public/scss/LoginPage.module.scss';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const response = await fetch('https://api.tmero.com/forget-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Something went wrong.');
                return;
            }
            setMessage('If an account with that email exists, we\'ve sent a password reset link. Please check your inbox.');
        } catch (err) {
            setError('Unable to connect to the server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPageWrapper}>
            <div className={styles.overlay}></div>
            <section className={styles.loginSectionCentered}>
                <div className={`${styles.formCard} forgotCardOverride`}>
                    <div className={styles.welcomeHeader}>
                        <h1 className={styles.welcomeTitle} style={{ fontSize: '1.5rem' }}>Forgot Password?</h1>
                        <p className={styles.welcomeText} style={{ fontSize: '1rem' }}>
                            Enter your email and we'll send you a reset link.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>Email</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.formInput}
                                    disabled={!!message}
                                />
                            </div>
                        </div>
                        {error && !message && (
                            <div className={styles.errorMessage}>
                                <span className={styles.errorIcon}>⚠️</span>
                                {error}
                            </div>
                        )}
                        {message && !error && (
                            <div className={styles.successMessage}>
                                <span className={styles.successIcon}>✓</span>
                                {message}
                            </div>
                        )}
                        <div className={styles.formActions}>
                            {!message && (
                                <button
                                    className={styles.loginBtn}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            )}
                        </div>
                    </form>
                    <div className={styles.formFooter}>
                        <a href="/log-in" className={styles.forgotPasswordBackLink}>Back to Login</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPasswordPage;
