import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './../public/scss/LoginPage.module.scss';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://api.tmero.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            if (data.data) {
                localStorage.setItem('token', data.data);
            }

            router.push('/dashboard');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPageWrapper}>
            <div className={styles.overlay}></div>
            <section className={styles.loginSectionCentered}>
                <div className={styles.formCard}>
                    <div className={styles.welcomeHeader}>
                        <h1 className={styles.welcomeTitle}>Welcome to Tmero!</h1>
                        <p className={styles.welcomeText}>
                            Start your exciting language learning journey
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className={styles.loginForm}>
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
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.formLabel}>Password</label>
                            <div className={styles.inputWrapper}>
                                <input 
                                    id="password"
                                    type="password" 
                                    name="password" 
                                    placeholder="Enter your password" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.formInput}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className={styles.errorMessage}>
                                <span className={styles.errorIcon}>⚠️</span>
                                {error}
                            </div>
                        )}

                        <div className={styles.formActions}>
                            <button 
                                className={`${styles.loginBtn} ${loading ? styles.loading : ''}`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                        </div>

                        <div className={styles.formFooter}>
                            <div className={styles.signupRedirect}>
                                New to Tmero? <a href="/sign-up">Create an account</a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
