import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FarmerNavBar from '../FarmerNavBar';
import './SubsForm.css';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const translations = {
  en: {
    title: "Subscribe Now",
    description: "Choose a plan and enjoy exclusive benefits:",
    quarterlyPlan: {
      title: "Quarterly Plan",
      price: "Price: ₹399",
      benefits: [
        "Get featured on FarmConnect",
        "Quarterly alerts and tips"
      ],
      button: "Choose Quarterly"
    },
    yearlyPlan: {
      title: "Yearly Plan",
      price: "Price: ₹799",
      benefits: [
        "Get featured on FarmConnect",
        "Exclusive discount on farming tools and resources"
      ],
      button: "Choose Yearly"
    },
    orderSummary: {
      selectedPlan: "Selected Plan:",
      totalAmount: "Total Amount:",
      plans: {
        quarterly: "Quarterly Plan",
        yearly: "Yearly Plan"
      }
    },
    proceedToPayment: "Proceed to Payment",
    errors: {
      selectPlan: "Please select a subscription plan",
      loadRazorpay: "Failed to load Razorpay SDK. Please try again.",
      subscriptionFailed: "Failed to subscribe. Please try again.",
      subscriptionSuccess: "Subscription successful!"
    }
  },
  mr: {
    title: "आता सदस्यता घ्या",
    description: "एक प्लॅन निवडा आणि विशेष लाभ मिळवा:",
    quarterlyPlan: {
      title: "तिमाही प्लॅन",
      price: "किंमत: ₹399",
      benefits: [
        "FarmConnect वर फीचर करा",
        "तिमाही अलर्ट आणि टिप्स"
      ],
      button: "तिमाही निवडा"
    },
    yearlyPlan: {
      title: "वार्षिक प्लॅन",
      price: "किंमत: ₹799",
      benefits: [
        "FarmConnect वर फीचर करा",
        "शेती साधनांवर विशेष सूट"
      ],
      button: "वार्षिक निवडा"
    },
    orderSummary: {
      selectedPlan: "निवडलेला प्लॅन:",
      totalAmount: "एकूण रक्कम:",
      plans: {
        quarterly: "तिमाही प्लॅन",
        yearly: "वार्षिक प्लॅन"
      }
    },
    proceedToPayment: "पेमेंट करा",
    errors: {
      selectPlan: "कृपया सदस्यता प्लॅन निवडा",
      loadRazorpay: "Razorpay SDK लोड करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
      subscriptionFailed: "सदस्यता घेण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
      subscriptionSuccess: "सदस्यता यशस्वी!"
    }
  },
  hi: {
    title: "अभी सदस्यता लें",
    description: "एक प्लान चुनें और विशेष लाभ प्राप्त करें:",
    quarterlyPlan: {
      title: "त्रैमासिक प्लान",
      price: "कीमत: ₹399",
      benefits: [
        "FarmConnect पर फीचर हो",
        "त्रैमासिक अलर्ट और टिप्स"
      ],
      button: "त्रैमासिक चुनें"
    },
    yearlyPlan: {
      title: "वार्षिक प्लान",
      price: "कीमत: ₹799",
      benefits: [
        "FarmConnect पर फीचर हो",
        "खेती के उपकरणों पर विशेष छूट"
      ],
      button: "वार्षिक चुनें"
    },
    orderSummary: {
      selectedPlan: "चुना गया प्लान:",
      totalAmount: "कुल राशि:",
      plans: {
        quarterly: "त्रैमासिक प्लान",
        yearly: "वार्षिक प्लान"
      }
    },
    proceedToPayment: "भुगतान करें",
    errors: {
      selectPlan: "कृपया सदस्यता प्लान चुनें",
      loadRazorpay: "Razorpay SDK लोड करने में विफल। कृपया पुनः प्रयास करें।",
      subscriptionFailed: "सदस्यता लेने में विफल। कृपया पुनः प्रयास करें।",
      subscriptionSuccess: "सदस्यता सफल!"
    }
  }
};

const SubscriptionPage = () => {
    const [subscriptionPlan, setSubscriptionPlan] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const { currentLanguage } = useLanguage();
    const t = translations[currentLanguage];

    const handleSelectPlan = (plan, amount) => {
        setSubscriptionPlan(plan);
        setTotalAmount(amount);
    };

    const handleProceedToPayment = () => {
        if (!subscriptionPlan) {
            toast.error(t.errors.selectPlan);
            return;
        }

        const amountInPaise = totalAmount * 100;

        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        const initiatePayment = async () => {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                toast.error(t.errors.loadRazorpay);
                return;
            }

            const options = {
                key: 'rzp_test_2BZTggwTEwm8GC',
                amount: amountInPaise,
                currency: 'INR',
                name: 'FarmConnect Subscription',
                description: 'Subscription Payment',
                handler: function (response) {
                    toast.success(t.errors.subscriptionSuccess + " Payment ID: " + response.razorpay_payment_id);
                    handleSubscription(response.razorpay_payment_id);
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        };

        initiatePayment();
    };

    const handleSubscription = async (paymentId) => {
        const subscriptionDetails = {
            subscriptionType: subscriptionPlan,
            paymentId: paymentId,
        };

        try {
            const response = await fetch('http://localhost:5000/api/subscribe-farmer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(subscriptionDetails),
            });

            const data = await response.json();
            if (data.message === 'Subscription successful!') {
                toast.success(t.errors.subscriptionSuccess);
                setTimeout(() => {
                    navigate('/farmer-dashboard');
                }, 2000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            toast.error(t.errors.subscriptionFailed);
        }
    };

    const getTranslatedPlanName = (plan) => {
        if (plan === 'Quarterly Plan') {
            return t.orderSummary.plans.quarterly;
        } else if (plan === 'Yearly Plan') {
            return t.orderSummary.plans.yearly;
        }
        return plan;
    };

    return (
        <>
            <FarmerNavBar onLogout={() => navigate('/farmer-login')} />
            <LanguageSelector />
            <div className="checkout-page-container">
                <h1>{t.title}</h1>
                <p className="subscription-description">{t.description}</p>
                <div className="checkout-content">
                    <div className="subscription-options">
                        <div className="subscription-card">
                            <h3>{t.quarterlyPlan.title}</h3>
                            <p>{t.quarterlyPlan.price}</p>
                            <ul>
                                {t.quarterlyPlan.benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                            <button onClick={() => handleSelectPlan('Quarterly Plan', 399)}>{t.quarterlyPlan.button}</button>
                        </div>
                        <div className="subscription-card">
                            <h3>{t.yearlyPlan.title}</h3>
                            <p>{t.yearlyPlan.price}</p>
                            <ul>
                                {t.yearlyPlan.benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                            <button onClick={() => handleSelectPlan('Yearly Plan', 799)}>{t.yearlyPlan.button}</button>
                        </div>
                    </div>

                    <div className="order-summary">
                        <h3>{t.orderSummary.selectedPlan} {subscriptionPlan ? getTranslatedPlanName(subscriptionPlan) : ''}</h3>
                        <h3>{t.orderSummary.totalAmount} ₹{totalAmount}</h3>
                    </div>
                </div>

                <button className="submit-button" onClick={handleProceedToPayment}>{t.proceedToPayment}</button>
                <ToastContainer />
            </div>
        </>
    );
};

export default SubscriptionPage;
