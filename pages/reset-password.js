import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './../public/scss/LoginPage.module.scss';

const ResetPasswordPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!password || !confirmPassword) {
            setError('Please fill in both fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!token) {
            setError('Invalid or missing token.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('https://api.tmero.com/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Something went wrong.');
                return;
            }
            setSuccess('Password reset successful! You can now log in.');
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
                        <h1 className={styles.welcomeTitle}>Reset Password</h1>
                        <p className={styles.welcomeText}>
                            Enter your new password below.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.formLabel}>New Password</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter new password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.formInput}
                                />
                                <span className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                                    <i className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'}></i>
                                </span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    id="confirmPassword"
                                    type={showConfirm ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm new password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={styles.formInput}
                                />
                                <span className={styles.passwordToggle} onClick={() => setShowConfirm(!showConfirm)}>
                                    <i className={showConfirm ? 'far fa-eye-slash' : 'far fa-eye'}></i>
                                </span>
                            </div>
                        </div>
                        {error && (
                            <div className={styles.errorMessage}>
                                <span className={styles.errorIcon}>⚠️</span>
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className={styles.successMessage}>
                                <span className={styles.successIcon}>✓</span>
                                {success}
                            </div>
                        )}
                        <div className={styles.formActions}>
                            <button
                                className={styles.loginBtn}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ResetPasswordPage;
