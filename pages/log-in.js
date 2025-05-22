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
            <section className={styles.loginSectionCentered}>
                <div className={styles.loginContainer}>
                    {/* Title Column */}
                    <div className={styles.loginTitleColumn}>
                        <div className={styles.loginTitle}>
                            <h2>Welcome Back to Tmero!</h2>
                            <div className={styles.loginDescription}>
                                Log in to continue your child's exciting language learning journey!
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className={styles.loginFormColumn}>
                        <div className={styles.loginFormInner}>
                            <form onSubmit={handleLogin} id="login-form">
                                <div className={styles.formGroup}>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Email" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Password" 
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && (
                                    <div className={styles.errorMessage}>
                                        {error}
                                    </div>
                                )}
                                <div className={styles.formGroup}>
                                <button 
                                    className={styles.loginBtn}
                                    type="submit"
                                    disabled={loading}
                                >
                                    Log In
                                </button>
                                </div>
                                <div className={styles.signupRedirect}>
                                    Don’t have an account? <a href="/sign-up">Sign up</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
