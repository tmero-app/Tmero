import React from 'react';
import styles from './../public/scss/PaymentSuccessPage.module.scss';
import { useRouter } from 'next/router';

const PaymentSuccessPage = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/log-in');
    };

    return (
        <div className={styles.paymentSuccessWrapper}>
            <section className={styles.paymentSuccessSectionCentered}>
                <div className={styles.paymentSuccessContainer}>
                    {/* Title Section */}
                    <div className={styles.paymentSuccessTitle}>
                        <h2>Payment Successful!</h2>
                        <p>Thank you for your payment. You’ve unlocked a world of language learning for your child! You can now login.</p>
                    </div>

                    {/* Login Button */}
                    <div className={styles.goHomeBtnContainer}>
                        <button className={styles.goHomeBtn} onClick={handleGoHome}>
                            Login
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PaymentSuccessPage;
