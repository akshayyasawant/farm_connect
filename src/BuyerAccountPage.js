import React, { useEffect, useState } from 'react';
import './BuyerAccountPage.css'; // Custom CSS for BuyerAccountPage
import BuyerNavBar from './BuyerNavBar'; // Import BuyerNavBar component
import buyerIcon from './assets/buyer.jpg'; // Default buyer icon image
import { useNavigate } from 'react-router-dom'; // For navigation

const BuyerAccountPage = () => {
    const [buyer, setBuyer] = useState(null);
    const navigate = useNavigate();

    // Fetch buyer details from backend using email from localStorage
    useEffect(() => {
        const buyerFromStorage = JSON.parse(localStorage.getItem('buyer'));
        if (buyerFromStorage && buyerFromStorage.email) {
            fetch(`http://localhost:5000/api/buyer-details?email=${buyerFromStorage.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setBuyer(data.buyer);
                    } else {
                        console.error('Error fetching buyer details:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error fetching buyer details:', error);
                });
        }
    }, []);

    // Handle logout functionality
    const handleLogout = () => {
        localStorage.removeItem('buyer'); // Clear buyer data from local storage
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <>
            {/* Reuse BuyerNavBar with logout functionality */}
            <BuyerNavBar onLogout={handleLogout} />

            <div className="buyer-account-container">
                {buyer ? (
                    <div className="account-card">
                        {/* Buyer Icon */}
                        <div className="profile-image-container">
                            <img src={buyerIcon} alt="Buyer Profile" />
                        </div>
                        <h1 className="profile-heading">Buyer Profile</h1>
                        <div className="profile-details">
                            <p><strong>First Name:</strong> {buyer.firstName}</p>
                            <p><strong>Last Name:</strong> {buyer.lastName}</p>
                            <p><strong>Email:</strong> {buyer.email}</p>
                            <p><strong>Phone Number:</strong> {buyer.phoneNumber}</p>
                            <p><strong>Address:</strong> {buyer.address}</p>
                        </div>
                    </div>
                ) : (
                    <p>No buyer details available. Please register or log in.</p>
                )}
            </div>
        </>
    );
};

export default BuyerAccountPage;
