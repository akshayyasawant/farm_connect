import React, { useEffect, useState } from 'react';
import './FarmerOrders.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import FarmerNavBar from '../FarmerNavBar';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const translations = {
  en: {
    title: "Your Orders",
    orderId: "Order ID",
    orderDate: "Order Date",
    totalAmount: "Total Amount",
    status: "Status",
    orderDetails: "Order Details",
    productName: "Product Name",
    quantity: "Quantity",
    price: "Price",
    subtotal: "Subtotal",
    noOrders: "No orders found",
    loading: "Loading orders...",
    statusOptions: {
      pending: "Pending",
      processing: "Processing",
      completed: "Completed"
    },
    updateStatus: "Update Status",
    updateSuccess: "Order status updated successfully!",
    updateError: "Error updating order status:",
    noOrdersAvailable: "No {status} orders available",
    loginRequired: "Please log in to view your orders",
    loadError: "Failed to load orders. Please try again.",
    noStatusChange: "No change in status. Please select a different status."
  },
  mr: {
    title: "तुमचे ऑर्डर",
    orderId: "ऑर्डर आयडी",
    orderDate: "ऑर्डर तारीख",
    totalAmount: "एकूण रक्कम",
    status: "स्थिती",
    orderDetails: "ऑर्डर तपशील",
    productName: "उत्पादनाचे नाव",
    quantity: "प्रमाण",
    price: "किंमत",
    subtotal: "उप-एकूण",
    noOrders: "कोणतेही ऑर्डर सापडले नाहीत",
    loading: "ऑर्डर लोड करत आहे...",
    statusOptions: {
      pending: "प्रलंबित",
      processing: "प्रक्रिया करत आहे",
      completed: "पूर्ण"
    },
    updateStatus: "स्थिती अपडेट करा",
    updateSuccess: "ऑर्डर स्थिती यशस्वीरित्या अपडेट केली!",
    updateError: "ऑर्डर स्थिती अपडेट करण्यात त्रुटी:",
    noOrdersAvailable: "{status} ऑर्डर उपलब्ध नाहीत",
    loginRequired: "कृपया तुमचे ऑर्डर पाहण्यासाठी लॉगिन करा",
    loadError: "ऑर्डर लोड करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    noStatusChange: "स्थितीत बदल नाही. कृपया वेगळी स्थिती निवडा."
  },
  hi: {
    title: "आपके ऑर्डर",
    orderId: "ऑर्डर आईडी",
    orderDate: "ऑर्डर की तारीख",
    totalAmount: "कुल राशि",
    status: "स्थिति",
    orderDetails: "ऑर्डर विवरण",
    productName: "उत्पाद का नाम",
    quantity: "मात्रा",
    price: "कीमत",
    subtotal: "उप-कुल",
    noOrders: "कोई ऑर्डर नहीं मिला",
    loading: "ऑर्डर लोड हो रहे हैं...",
    statusOptions: {
      pending: "लंबित",
      processing: "प्रोसेसिंग",
      completed: "पूर्ण"
    },
    updateStatus: "स्थिति अपडेट करें",
    updateSuccess: "ऑर्डर स्थिति सफलतापूर्वक अपडेट की गई!",
    updateError: "ऑर्डर स्थिति अपडेट करने में त्रुटि:",
    noOrdersAvailable: "कोई {status} ऑर्डर उपलब्ध नहीं है",
    loginRequired: "कृपया अपने ऑर्डर देखने के लिए लॉगिन करें",
    loadError: "ऑर्डर लोड करने में विफल। कृपया पुनः प्रयास करें।",
    noStatusChange: "स्थिति में कोई बदलाव नहीं। कृपया एक अलग स्थिति चुनें।"
  }
};

const FarmerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { currentLanguage } = useLanguage();
    const t = translations[currentLanguage];

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error(t.loginRequired);
                navigate('/farmer-login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/farmer-orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error(t.loadError);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate, t]);

    const updateOrderStatus = async (orderId, currentStatus) => {
        const newStatus = document.getElementById(`status-select-${orderId}`).value;
        if (newStatus && newStatus !== currentStatus) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:5000/api/update-order-status/${orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ newStatus }),
                });

                const data = await response.json();
                if (data.success) {
                    setOrders((prevOrders) =>
                        prevOrders.map((order) =>
                            order._id === orderId ? data.order : order
                        )
                    );
                    toast.success(t.updateSuccess);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Error updating order status:', error);
                toast.error(`${t.updateError} ${error.message}`);
            }
        } else {
            toast.error(t.noStatusChange);
        }
    };

    const renderOrdersByStatus = (status, statusClass) => {
        const filteredOrders = orders.filter((order) => order.status === status);
        return (
            <div className={`orders-section ${statusClass}`}>
                <h2 className={statusClass}>{t.statusOptions[status]} {t.title}</h2>
                {filteredOrders.length === 0 && (
                    <p>{t.noOrdersAvailable.replace('{status}', t.statusOptions[status].toLowerCase())}</p>
                )}
                {filteredOrders.map((order) => (
                    <div key={order._id} className="order-card">
                        <h2>{t.orderId}: {order._id}</h2>
                        <p>{t.status}: {t.statusOptions[order.status]}</p>
                        <div className="order-items">
                            {order.cartItems.map((item, index) => (
                                <div key={index} className="order-item">
                                    <div className="item-details">
                                        <h4>{t.productName}: {item.productId.name}</h4>
                                        <p>{t.price}: ₹{item.productId.price} x {item.quantity}</p>
                                    </div>
                                    <div>
                                        <h4>{t.totalAmount}: ₹{order.totalPrice}</h4>
                                        <p>{t.orderDate}: {new Date(order.orderDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="item-image">
                                        <img src={
                                        item.productId.imageUrl
                                            ? `http://localhost:5000/${item.productId.imageUrl}`
                                            : 'path/to/fallback-image.png'
                                        } alt={item.productId.name} />
                                    </div>
                            </div>
                        ))}
                            </div>
                        <div className="status-update">
                            <select id={`status-select-${order._id}`} defaultValue={order.status}>
                                {Object.entries(t.statusOptions).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => updateOrderStatus(order._id, order.status)}>
                                {t.updateStatus}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) return <div className="loading">{t.loading}</div>;

    return (
        <>
            <FarmerNavBar />
            <LanguageSelector />
            <div className="farmer-orders-container">
                <h1>{t.title}</h1>
                <div className="orders-container">
                    {renderOrdersByStatus('pending', 'pending')}
                    {renderOrdersByStatus('processing', 'processing')}
                    {renderOrdersByStatus('completed', 'completed')}
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default FarmerOrders;
