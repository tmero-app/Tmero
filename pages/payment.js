import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import styles from './../public/scss/PaymentPage.module.scss';

const stripePromise = loadStripe('pk_test_51N4dxGIJjqQ6w4V59eH13SRGXkG0L7M7c6QhKJZL5U3LEphpT9u6R2VyJuBBsC9SWGu8P97WWGp3ckhq9yT8ZdSR0054LGHioJ');

const PaymentForm = ({ clientSecret }) => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!elements || !stripe) return;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href + "?success=true",
            },
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            const signupData = JSON.parse(localStorage.getItem('signupData'));
            fetch('https://api.tmero.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.statusCode === 200) {
                    localStorage.removeItem('signupData');
                    router.push('/payment-success');
                } else {
                    setMessage('Error registering user.');
                }
            })
            .catch(error => {
                setMessage('Error registering user.');
            });
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <div id="payment-element"><PaymentElement /></div>
            <button type="submit" className={styles.paymentBtn}>Pay</button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

const PaymentPage = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                setIsLoading(true);

                const response = await fetch("https://api.tmero.com/payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: 20, currency: "usd" })
                });
                const data = await response.json();
                setClientSecret(data.data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientSecret();
    }, []);

    if (isLoading) {
        return (
            <div className="preloader"> 
                
            </div>
        );
    }

    if (!clientSecret) return null; 

    return (
        <div className={styles.paymentPageWrapper}>
            <section className={styles.paymentSectionCentered}>
                <div className={styles.paymentContainer}>
                    <div className={styles.paymentTitleColumn}>
                        <h2>Complete Your Payment</h2>
                        <p>Secure your spot and unlock all the language learning features for your child!</p>
                    </div>
                    <div className={styles.paymentFormColumn}>
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <PaymentForm clientSecret={clientSecret} />
                        </Elements>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PaymentPage;
