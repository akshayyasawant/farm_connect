import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './YourProducts.css';
import FarmerNavBar from '../FarmerNavBar';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const translations = {
  en: {
    title: "Your Products",
    productName: "Product Name",
    description: "Description",
    price: "Price",
    category: "Category",
    quantity: "Quantity",
    unit: "Unit",
    edit: "Edit",
    delete: "Delete",
    noProducts: "No products found",
    loading: "Loading products...",
    deleteConfirm: "Are you sure you want to delete this product?",
    deleteSuccess: "Product deleted successfully!",
    deleteError: "Error deleting product:",
    editSuccess: "Product updated successfully!",
    editError: "Error updating product:",
    categories: {
      fruits: "Fruits",
      vegetables: "Vegetables",
      grains: "Grains",
      millets: "Millets"
    }
  },
  mr: {
    title: "तुमची उत्पादने",
    productName: "उत्पादनाचे नाव",
    description: "वर्णन",
    price: "किंमत",
    category: "श्रेणी",
    quantity: "प्रमाण",
    unit: "एकक",
    edit: "संपादित करा",
    delete: "हटवा",
    noProducts: "कोणतीही उत्पादने सापडली नाहीत",
    loading: "उत्पादने लोड करत आहे...",
    deleteConfirm: "तुम्हाला खात्री आहे की तुम्ही हे उत्पादन हटवू इच्छिता?",
    deleteSuccess: "उत्पादन यशस्वीरित्या हटवले!",
    deleteError: "उत्पादन हटवण्यात त्रुटी:",
    editSuccess: "उत्पादन यशस्वीरित्या अपडेट केले!",
    editError: "उत्पादन अपडेट करण्यात त्रुटी:",
    categories: {
      fruits: "फळे",
      vegetables: "भाज्या",
      grains: "धान्ये",
      millets: "ज्वारी"
    }
  },
  hi: {
    title: "आपके उत्पाद",
    productName: "उत्पाद का नाम",
    description: "विवरण",
    price: "कीमत",
    category: "श्रेणी",
    quantity: "मात्रा",
    unit: "इकाई",
    edit: "संपादित करें",
    delete: "हटाएं",
    noProducts: "कोई उत्पाद नहीं मिला",
    loading: "उत्पाद लोड हो रहे हैं...",
    deleteConfirm: "क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?",
    deleteSuccess: "उत्पाद सफलतापूर्वक हटा दिया गया!",
    deleteError: "उत्पाद हटाने में त्रुटि:",
    editSuccess: "उत्पाद सफलतापूर्वक अपडेट किया गया!",
    editError: "उत्पाद अपडेट करने में त्रुटि:",
    categories: {
      fruits: "फल",
      vegetables: "सब्जियां",
      grains: "अनाज",
      millets: "बाजरा"
    }
  }
};

const YourProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { currentLanguage } = useLanguage();
    const t = translations[currentLanguage];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/your-products', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        navigate('/sell', { state: { product } });
    };

    const handleDelete = async (id) => {
        if (window.confirm(t.deleteConfirm)) {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to delete product');
                fetchProducts();
                toast.success(t.deleteSuccess);
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error(`${t.deleteError} ${error.message}`);
            }
        }
    };

    if (loading) return <p>{t.loading}</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <FarmerNavBar></FarmerNavBar>
            <LanguageSelector />
            <div className="your-products-container">
                <h1>{t.title}</h1>
                {products.length === 0 ? (
                    <p className="no-products">{t.noProducts}</p>
                ) : (
                    <div className="product-list">
                        {products.map((product) => (
                            <div className="product-card" key={product._id}>
                                <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} />
                                <h2>{product.name}</h2>
                                <p className="description">{t.description}: {product.description}</p>
                                <p className="price">{t.price}: ₹{product.price}</p>
                                <p className="quantity">{t.quantity}: {product.quantity} {product.unit}</p>
                                {product.subtype && (
                                    <p className="subtype">{t.subtype}: {product.subtype}</p>
                                )}
                                <div className="button-group">
                                    <button className="edit-button" onClick={() => handleEdit(product)}>{t.edit}</button>
                                    <button className="delete-button" onClick={() => handleDelete(product._id)}>{t.delete}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default YourProducts;
