import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBook, faChartLine } from '@fortawesome/free-solid-svg-icons'; // Added faChartLine icon
import './FarmerNavBar.css'; // Import your custom CSS
import SubscribedLabel from './components/SubscribedLabel';
import { useLanguage } from './context/LanguageContext';

const translations = {
  en: {
    home: "Home",
    account: "Account",
    logout: "Logout",
    resourceHub: "Resource Hub",
    analytics: "Analytics"
  },
  mr: {
    home: "होम",
    account: "खाते",
    logout: "लॉगआउट",
    resourceHub: "संसाधन केंद्र",
    analytics: "विश्लेषण"
  },
  hi: {
    home: "होम",
    account: "खाता",
    logout: "लॉगआउट",
    resourceHub: "संसाधन केंद्र",
    analytics: "विश्लेषण"
  }
};

const FarmerNavBar = ({ onLogout }) => {
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { currentLanguage } = useLanguage();
    const t = translations[currentLanguage];

    useEffect(() => {
        const fetchFarmerSubscriptionStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
        
                const response = await fetch('http://localhost:5000/api/farmer/status', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error(errorData.message || 'Network response was not ok');
                }
        
                const data = await response.json();
                setIsSubscribed(data.is_subscribed);
            } catch (error) {
                console.error('Error fetching subscription status:', error);
            }
        };

        fetchFarmerSubscriptionStatus();
    }, []);

    return (
        <nav className="farmer-navbar">
            <div className="navbar-logo" onClick={() => navigate('/farmer-dashboard')}>
                <h2>FarmConnect</h2> {/* Acts as the home link */}
            </div>
            <ul className="navbar-links">
                {isSubscribed ? <li><SubscribedLabel></SubscribedLabel></li> : null}
                <li onClick={() => navigate('/farmer-dashboard')}>{t.home}</li>
                <li onClick={() => navigate('/resource-hub')}>
                    <FontAwesomeIcon icon={faBook} className="icon" /> {t.resourceHub}
                </li>
                <li onClick={() => navigate('/farmer-analytics')}>
                    <FontAwesomeIcon icon={faChartLine} className="icon" /> {t.analytics}
                </li>
                <li onClick={() => navigate('/farmer-account')}>
                    <FontAwesomeIcon icon={faUser} className="icon" /> {t.account}
                </li>
                <li onClick={() => navigate('/predict')}>
                    <FontAwesomeIcon icon={faUser} className="icon" /> Predict
                </li>
                <li onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> {t.logout}
                </li>
            </ul>
        </nav>
    );
};

export default FarmerNavBar;
