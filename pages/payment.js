import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './../public/scss/PaymentPage.module.scss';

const PaymentPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchPaymentUrl = async () => {
            try {
                setIsLoading(true);

                // Retrieve the token from localStorage (which was saved after signup)
                const token = localStorage.getItem('registrationToken');
                if (!token) {
                    console.error("Token not found in localStorage.");
                    setIsLoading(false);
                    return;
                }
                setToken(token); 

                // Make the API call to get the payment URL
                const response = await fetch('https://api.tmero.com/payment', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: 20, currency: 'usd' }) 
                });

                const data = await response.json();
                console.log('Payment URL Response:', data);

                if (data.data) {
                    setPaymentUrl(data.data); 
                } else {
                    setIsLoading(false);
                    console.error("No payment URL received.");
                }
            } catch (error) {
                console.error("Error fetching payment URL:", error);
                setIsLoading(false);
            }
        };

        fetchPaymentUrl();
    }, []);

    useEffect(() => {
        if (paymentUrl) {
            // Redirect to the external payment page when the payment URL is received
            window.location.href = paymentUrl;
        }
    }, [paymentUrl]);

    if (isLoading) {
        return (
            <div className="preloader"> </div> 
        );
    }

    return (
        <div className={styles.paymentPageWrapper}>
            <section className={styles.paymentSectionCentered}>
                <div className={styles.paymentContainer}>
                    <div className={styles.paymentTitleColumn}>
                        <h2>Redirecting to Payment...</h2>
                        <p>Please wait while we redirect you to the secure payment page.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PaymentPage;
