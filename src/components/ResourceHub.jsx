import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faHandHoldingUsd, faBook, faTractor, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './ResourceHub.css';

const ResourceHub = () => {
    const [activeTab, setActiveTab] = useState('schemes');

    const schemes = [
        {
            title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
            description: "Direct income support of ₹6,000 per year to all landholding farmer families.",
            eligibility: "All landholding farmer families",
            howToApply: "1. Visit nearest Common Service Centre (CSC)\n2. Submit Aadhaar card and land documents\n3. Fill PM-KISAN form\n4. Get registered for direct benefit transfer",
            link: "https://pmkisan.gov.in/"
        },
        {
            title: "Kisan Credit Card (KCC)",
            description: "Credit card for farmers to meet their agricultural needs with interest subvention.",
            eligibility: "All farmers including tenant farmers, sharecroppers",
            howToApply: "1. Visit nearest bank branch\n2. Submit land documents and ID proof\n3. Fill KCC application form\n4. Get credit card within 2 weeks",
            link: "https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12345"
        },
        {
            title: "PM Fasal Bima Yojana",
            description: "Crop insurance scheme to protect farmers against crop failure.",
            eligibility: "All farmers growing notified crops",
            howToApply: "1. Contact nearest insurance company\n2. Submit crop details and land documents\n3. Pay premium\n4. Get insurance certificate",
            link: "https://pmfby.gov.in/"
        }
    ];

    const subsidies = [
        {
            title: "Subsidy on Agricultural Machinery",
            description: "Up to 40% subsidy on purchase of agricultural machinery and equipment.",
            eligibleItems: ["Tractors", "Harvesters", "Seed drills", "Sprayers"],
            howToApply: "1. Select machinery from approved list\n2. Submit application to agriculture department\n3. Get approval and purchase machinery\n4. Claim subsidy with bills",
            link: "https://agricoop.gov.in/"
        },
        {
            title: "Subsidy on Seeds and Fertilizers",
            description: "Subsidy on certified seeds and fertilizers for better crop yield.",
            eligibleItems: ["Certified seeds", "Bio-fertilizers", "Organic fertilizers"],
            howToApply: "1. Visit nearest Krishi Vikas Kendra\n2. Submit land documents\n3. Get subsidy voucher\n4. Purchase from authorized dealers",
            link: "https://www.fertilizer.org/"
        }
    ];

    const farmingTips = [
        {
            category: "Soil Health",
            tips: [
                "Regular soil testing every 3 years",
                "Use organic manure and compost",
                "Practice crop rotation",
                "Maintain proper pH levels"
            ]
        },
        {
            category: "Water Management",
            tips: [
                "Implement drip irrigation",
                "Use mulching techniques",
                "Harvest rainwater",
                "Schedule irrigation based on crop needs"
            ]
        },
        {
            category: "Pest Management",
            tips: [
                "Use integrated pest management",
                "Plant pest-resistant varieties",
                "Maintain proper spacing between crops",
                "Use natural pest repellents"
            ]
        }
    ];

    const marketInfo = [
        {
            title: "Market Prices",
            description: "Real-time prices for major crops in your region",
            source: "Agmarknet Portal",
            link: "https://agmarknet.gov.in/"
        },
        {
            title: "Weather Forecast",
            description: "Accurate weather predictions for better farming decisions",
            source: "IMD Weather Portal",
            link: "https://mausam.imd.gov.in/"
        },
        {
            title: "Best Practices",
            description: "Latest farming techniques and research findings",
            source: "ICAR Knowledge Portal",
            link: "https://icar.org.in/"
        }
    ];

    return (
        <div className="resource-hub">
            <h2>Farmer Resource Hub</h2>
            
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'schemes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('schemes')}
                >
                    <FontAwesomeIcon icon={faHandHoldingUsd} /> Government Schemes
                </button>
                <button 
                    className={`tab ${activeTab === 'subsidies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('subsidies')}
                >
                    <FontAwesomeIcon icon={faSeedling} /> Subsidies
                </button>
                <button 
                    className={`tab ${activeTab === 'tips' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tips')}
                >
                    <FontAwesomeIcon icon={faTractor} /> Farming Tips
                </button>
                <button 
                    className={`tab ${activeTab === 'market' ? 'active' : ''}`}
                    onClick={() => setActiveTab('market')}
                >
                    <FontAwesomeIcon icon={faBook} /> Market Information
                </button>
            </div>

            <div className="content">
                {activeTab === 'schemes' && (
                    <div className="schemes-container">
                        {schemes.map((scheme, index) => (
                            <div key={index} className="scheme-card">
                                <h3>{scheme.title}</h3>
                                <p>{scheme.description}</p>
                                <div className="scheme-details">
                                    <h4>Eligibility:</h4>
                                    <p>{scheme.eligibility}</p>
                                    <h4>How to Apply:</h4>
                                    <p>{scheme.howToApply}</p>
                                    <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="apply-link">
                                        Apply Now <FontAwesomeIcon icon={faFileAlt} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'subsidies' && (
                    <div className="subsidies-container">
                        {subsidies.map((subsidy, index) => (
                            <div key={index} className="subsidy-card">
                                <h3>{subsidy.title}</h3>
                                <p>{subsidy.description}</p>
                                <div className="subsidy-details">
                                    <h4>Eligible Items:</h4>
                                    <ul>
                                        {subsidy.eligibleItems.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                    <h4>How to Apply:</h4>
                                    <p>{subsidy.howToApply}</p>
                                    <a href={subsidy.link} target="_blank" rel="noopener noreferrer" className="apply-link">
                                        Learn More <FontAwesomeIcon icon={faFileAlt} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'tips' && (
                    <div className="tips-container">
                        {farmingTips.map((category, index) => (
                            <div key={index} className="tips-card">
                                <h3>{category.category}</h3>
                                <ul>
                                    {category.tips.map((tip, i) => (
                                        <li key={i}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'market' && (
                    <div className="market-container">
                        {marketInfo.map((info, index) => (
                            <div key={index} className="market-card">
                                <h3>{info.title}</h3>
                                <p>{info.description}</p>
                                <p className="source">Source: {info.source}</p>
                                <a href={info.link} target="_blank" rel="noopener noreferrer" className="market-link">
                                    Visit Portal <FontAwesomeIcon icon={faFileAlt} />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResourceHub; 