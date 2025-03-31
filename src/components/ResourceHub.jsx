import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faHandHoldingUsd, faBook, faTractor, faFileAlt, faInfoCircle, faCheckCircle, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import FarmerNavBar from '../FarmerNavBar';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { subsidyTranslations } from '../translations/subsidies';
import { grantTranslations } from '../translations/grants';
import { farmingTipsTranslations } from '../translations/farmingTips';
import { marketInfoTranslations } from '../translations/marketInfo';
import './ResourceHub.css';

const translations = {
  en: {
    title: "Farmer Resource Hub",
    tabs: {
      schemes: "Government Schemes",
      subsidies: "Subsidies",
      grants: "Government Grants",
      tips: "Farming Tips",
      market: "Market Information"
    },
    viewDetails: "View Details",
    schemes: {
      pmKisan: {
            title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
            description: "Direct income support of ₹6,000 per year to all landholding farmer families.",
            eligibility: "All landholding farmer families",
            benefits: [
                "₹6,000 per year in three equal installments",
                "Direct transfer to bank accounts",
                "No middlemen involved",
                "Helps meet agricultural expenses",
                "Additional benefits for organic farming",
                "Special provisions for women farmers"
            ],
            documents: [
                "Aadhaar card",
                "Land documents",
                "Bank account details",
                "Recent photograph",
                "Income certificate",
                "Caste certificate (if applicable)"
            ],
            howToApply: [
                "Visit nearest Common Service Centre (CSC)",
                "Submit Aadhaar card and land documents",
                "Fill PM-KISAN form",
                "Get registered for direct benefit transfer",
                "Verify details through OTP",
                "Receive confirmation message"
            ],
            importantNotes: [
                "No application fee required",
                "Update bank account details if changed",
                "Check beneficiary status online",
                "Contact helpline for assistance",
                "Annual renewal required",
                "Special provisions for differently-abled farmers"
        ]
        },
      kcc: {
            title: "Kisan Credit Card (KCC)",
            description: "Credit card for farmers to meet their agricultural needs with interest subvention.",
            eligibility: "All farmers including tenant farmers, sharecroppers",
            benefits: [
                "Interest subvention of 2%",
                "Additional 3% for timely repayment",
                "Flexible credit limit",
                "Insurance coverage",
                "No processing fee",
                "Emergency credit facility",
                "Crop insurance coverage"
            ],
            documents: [
                "Land documents",
                "ID proof",
                "Bank account details",
                "Recent photograph",
                "Crop details",
                "Income proof",
                "Property documents"
            ],
            howToApply: [
                "Visit nearest bank branch",
                "Submit land documents and ID proof",
                "Fill KCC application form",
                "Get credit card within 2 weeks",
                "Complete KYC verification",
                "Link with Aadhaar",
                "Set up mobile banking"
            ],
            importantNotes: [
                "No processing fee",
                "Insurance coverage included",
                "Flexible repayment options",
                "Can be used at ATMs",
                "Emergency credit available",
                "Annual renewal required",
                "Special provisions for women farmers"
        ]
      }
    },
    modal: {
      eligibility: "Eligibility",
      benefits: "Benefits",
      requiredDocuments: "Required Documents",
      howToApply: "How to Apply",
      importantNotes: "Important Notes",
      applyNow: "Apply Now",
      learnMore: "Learn More"
    }
  },
  mr: {
    title: "शेतकरी संसाधन केंद्र",
    tabs: {
      schemes: "सरकारी योजना",
      subsidies: "सबसिडी",
      grants: "सरकारी अनुदान",
      tips: "शेती टिप्स",
      market: "बाजार माहिती"
    },
    viewDetails: "तपशील पहा",
    schemes: {
      pmKisan: {
        title: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधी)",
        description: "सर्व जमीनधारक शेतकरी कुटुंबांना दरवर्षी ₹6,000 चे थेट उत्पन्न समर्थन.",
        eligibility: "सर्व जमीनधारक शेतकरी कुटुंबे",
            benefits: [
          "दरवर्षी तीन समान हप्त्यांमध्ये ₹6,000",
          "बँक खात्यात थेट हस्तांतरण",
          "मध्यस्थ नाही",
          "कृषी खर्च पूर्ण करण्यास मदत",
          "जैविक शेतीसाठी अतिरिक्त लाभ",
          "महिला शेतकऱ्यांसाठी विशेष तरतूद"
            ],
            documents: [
          "आधार कार्ड",
          "जमीन दस्तऐवज",
          "बँक खाते तपशील",
          "अलीकडील फोटो",
          "उत्पन्न प्रमाणपत्र",
          "जात प्रमाणपत्र (जर लागू असेल तर)"
            ],
            howToApply: [
          "जवळच्या कॉमन सर्व्हिस सेंटर (CSC) ला भेट द्या",
          "आधार कार्ड आणि जमीन दस्तऐवज सबमिट करा",
          "पीएम-किसान फॉर्म भरा",
          "थेट लाभ हस्तांतरणासाठी नोंदणी करा",
          "OTP द्वारे तपशील सत्यापित करा",
          "पुष्टीकरण संदेश प्राप्त करा"
            ],
            importantNotes: [
          "अर्ज शुल्क आवश्यक नाही",
          "बँक खाते तपशील बदलल्यास अपडेट करा",
          "लाभार्थी स्थिती ऑनलाइन तपासा",
          "सहाय्यासाठी हेल्पलाइन संपर्क साधा",
          "वार्षिक नूतनीकरण आवश्यक",
          "विकलांग शेतकऱ्यांसाठी विशेष तरतूद"
        ]
      },
      kcc: {
        title: "किसान क्रेडिट कार्ड (केसीसी)",
        description: "व्याज सबसिडीसह शेतकऱ्यांसाठी कृषी गरजा पूर्ण करण्यासाठी क्रेडिट कार्ड।",
        eligibility: "भाडेकरू आणि शेअरक्रॉपर सहित सभी शेतकरी",
            benefits: [
          "2% व्याज सबसिडी",
          "वेळेवर परतफेडीसाठी अतिरिक्त 3%",
          "लवचिक क्रेडिट मर्यादा",
          "विमा कव्हरेज",
          "प्रोसेसिंग शुल्क नाही",
          "आपत्कालीन क्रेडिट सुविधा",
          "पीक विमा कव्हरेज"
            ],
            documents: [
          "जमीन दस्तऐवज",
          "आयडी प्रूफ",
          "बँक खाते तपशील",
          "अलीकडील फोटो",
          "पीक तपशील",
          "उत्पन्न प्रूफ",
          "मालमत्ता दस्तऐवज"
            ],
            howToApply: [
          "जवळच्या बँक शाखेला भेट द्या",
          "जमीन दस्तऐवज आणि आयडी प्रूफ सबमिट करा",
          "केसीसी अर्ज फॉर्म भरा",
          "2 आठवड्यांत क्रेडिट कार्ड मिळवा",
          "KYC सत्यापन पूर्ण करा",
          "आधारशी लिंक करा",
          "मोबाईल बँकिंग सेट करा"
            ],
            importantNotes: [
          "प्रोसेसिंग शुल्क नाही",
          "विमा कव्हरेज समाविष्ट",
          "लवचिक परतफेड पर्याय",
          "ATMs वर वापरता येते",
          "आपातकालीन क्रेडिट उपलब्ध",
          "वार्षिक नूतनीकरण आवश्यक",
          "महिला शेतकऱ्यांसाठी विशेष तरतूद"
        ]
      },
      grants: {
        startupIndia: {
          title: "स्टार्टअप इंडिया कृषी अनुदान",
          description: "कृषी स्टार्टअप आणि नवोपक्रमांसाठी आर्थिक सहाय्य.",
          eligibility: "एग्री-टेक स्टार्टअप आणि नवोपक्रमकर्ते",
          benefits: [
            "₹25 लाख पर्यंत अनुदान",
            "मार्गदर्शन सहाय्य",
            "तांत्रिक मार्गदर्शन",
            "बाजार संबंध",
            "प्रशिक्षण कार्यक्रम",
            "नेटवर्किंग संधी"
          ],
          documents: [
            "व्यवसाय योजना",
            "नवोपक्रम तपशील",
            "संघटना पात्रता",
            "आर्थिक अंदाज",
            "बाजार विश्लेषण",
            "तांत्रिक व्यवहार्यता अहवाल"
          ],
          howToApply: [
            "स्टार्टअप इंडिया पोर्टलवर नोंदणी करा",
            "विस्तृत प्रस्ताव सबमिट करा",
            "तांत्रिक मूल्यांकन मिळवा",
            "निवड समितीसमोर सादर करा",
            "मंजुरी मिळवा",
            "अनुदान प्राप्त करा"
          ],
          importantNotes: [
            "नवोपक्रम केंद्रित असणे आवश्यक",
            "नियमित प्रगती अहवाल आवश्यक",
            "माइलस्टोन ट्रॅकिंग अनिवार्य",
            "लेखापरीक्षण आवश्यकता",
            "आयपी संरक्षण मार्गदर्शन",
            "बाजार प्रमाणीकरण आवश्यक"
          ]
        },
        agriExport: {
          title: "कृषी निर्यात अनुदान",
          description: "कृषी उत्पादनांची निर्यात करणाऱ्या शेतकऱ्यांना आणि संस्थांना सहाय्य.",
          eligibility: "कृषी उत्पादनांची निर्यात करणारे शेतकरी आणि संस्था",
          benefits: [
            "निर्यात पायाभूत सुविधा सहाय्य",
            "गुणवत्ता प्रमाणपत्र सहाय्य",
            "बाजार विकास सहाय्य",
            "प्रशिक्षण कार्यक्रम",
            "लॉजिस्टिक्स सहाय्य",
            "ब्रँड विकास"
          ],
          documents: [
            "निर्यात नोंदणी",
            "व्यवसाय योजना",
            "बाजार विश्लेषण",
            "उत्पादन तपशील",
            "गुणवत्ता प्रमाणपत्रे",
            "आर्थिक विवरण"
          ],
          howToApply: [
            "निर्यातकर्ता म्हणून नोंदणी करा",
            "प्रस्ताव सबमिट करा",
            "तांत्रिक मूल्यांकन मिळवा",
            "मंजुरी मिळवा",
            "योजना अंमलबजावणी करा",
            "लाभ मिळवा"
          ],
          importantNotes: [
            "निर्यात केंद्रित असणे आवश्यक",
            "गुणवत्ता मानके पूर्ण करणे आवश्यक",
            "नियमित अहवाल आवश्यक",
            "बाजार अनुपालन आवश्यक",
            "दस्तऐवजीकरण अनिवार्य",
            "पुढील भेटी आवश्यक"
          ]
        },
        organicFarming: {
          title: "जैविक शेती अनुदान",
          description: "जैविक शेतीकडे संक्रमणासाठी आर्थिक सहाय्य.",
          eligibility: "जैविक शेती करणारे किंवा संक्रमण करणारे शेतकरी",
          benefits: [
            "प्रमाणपत्र सहाय्य",
            "इनपुट सहाय्य",
            "प्रशिक्षण कार्यक्रम",
            "बाजार संबंध",
            "पायाभूत सुविधा सहाय्य",
            "तांत्रिक मार्गदर्शन"
          ],
          documents: [
            "जमीन मालकी प्रमाणपत्र",
            "जैविक शेती योजना",
            "माती तपासणी अहवाल",
            "मागील शेती नोंदी",
            "बाजार संबंध प्रमाणपत्र",
            "प्रशिक्षण प्रमाणपत्रे"
          ],
          howToApply: [
            "जैविक शेती विभागाशी संपर्क साधा",
            "अर्ज सबमिट करा",
            "क्षेत्र तपासणी मिळवा",
            "मंजुरी मिळवा",
            "जैविक पद्धती अंमलबजावणी करा",
            "प्रमाणपत्र मिळवा"
          ],
          importantNotes: [
            "जैविक मानके पूर्ण करणे आवश्यक",
            "नियमित तपासणी आवश्यक",
            "दस्तऐवजीकरण अनिवार्य",
            "प्रशिक्षण उपस्थिती आवश्यक",
            "गुणवत्ता तपासणी आवश्यक",
            "पुढील भेटी अनिवार्य"
          ]
        }
      },
    },
    modal: {
      eligibility: "पात्रता",
      benefits: "लाभ",
      requiredDocuments: "आवश्यक दस्तऐवज",
      howToApply: "अर्ज कसा करावा",
      importantNotes: "महत्वाच्या नोट्स",
      applyNow: "आता अर्ज करा",
      learnMore: "अधिक जाणून घ्या"
    }
  },
  hi: {
    title: "किसान संसाधन केंद्र",
    tabs: {
      schemes: "सरकारी योजनाएं",
      subsidies: "सब्सिडी",
      grants: "सरकारी अनुदान",
      tips: "खेती के टिप्स",
      market: "बाजार जानकारी"
    },
    viewDetails: "विवरण देखें",
    schemes: {
      pmKisan: {
        title: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
        description: "सभी जमीनधारक किसान परिवारों को प्रति वर्ष ₹6,000 का प्रत्यक्ष आय सहायता।",
        eligibility: "सभी जमीनधारक किसान परिवार",
            benefits: [
          "प्रति वर्ष तीन समान किस्तों में ₹6,000",
          "बैंक खातों में प्रत्यक्ष हस्तांतरण",
          "कोई बिचौलिया नहीं",
          "कृषि खर्च पूर्ण करने में मदद",
          "जैविक खेती के लिए अतिरिक्त लाभ",
          "महिला किसानों के लिए विशेष प्रावधान"
            ],
            documents: [
          "आधार कार्ड",
          "जमीन दस्तावेज",
          "बैंक खाता विवरण",
          "हाल का फोटो",
          "आय प्रमाणपत्र",
          "जाति प्रमाणपत्र (यदि लागू हो)"
            ],
            howToApply: [
          "निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं",
          "आधार कार्ड और जमीन दस्तावेज जमा करें",
          "पीएम-किसान फॉर्म भरें",
          "प्रत्यक्ष लाभ हस्तांतरण के लिए पंजीकरण करें",
          "OTP के माध्यम से विवरण सत्यापित करें",
          "पुष्टि संदेश प्राप्त करें"
            ],
            importantNotes: [
          "कोई आवेदन शुल्क नहीं",
          "बैंक खाता विवरण बदलने पर अपडेट करें",
          "लाभार्थी स्थिति ऑनलाइन जांचें",
          "सहायता के लिए हेल्पलाइन से संपर्क करें",
          "वार्षिक नवीनीकरण आवश्यक",
          "दिव्यांग किसानों के लिए विशेष प्रावधान"
        ]
      },
      kcc: {
        title: "किसान क्रेडिट कार्ड (केसीसी)",
        description: "ब्याज सबसिडी के साथ किसानों के लिए कृषि जरूरतों को पूरा करने के लिए क्रेडिट कार्ड।",
        eligibility: "किराएदार किसान और शेयरक्रॉपर सहित सभी किसान",
            benefits: [
          "2% ब्याज सबसिडी",
          "समय पर चुकौती पर अतिरिक्त 3%",
          "लचीली क्रेडिट सीमा",
          "बीमा कवरेज",
          "कोई प्रोसेसिंग शुल्क नहीं",
          "आपातकालीन क्रेडिट सुविधा",
          "फसल बीमा कवरेज"
            ],
            documents: [
          "जमीन दस्तावेज",
          "पहचान प्रमाण",
          "बैंक खाता विवरण",
          "हाल का फोटो",
          "फसल विवरण",
          "आय प्रमाण",
          "संपत्ति दस्तावेज"
            ],
            howToApply: [
          "निकटतम बैंक शाखा पर जाएं",
          "जमीन दस्तावेज और पहचान प्रमाण जमा करें",
          "केसीसी अर्ज फॉर्म भरें",
          "2 सप्ताह में क्रेडिट कार्ड प्राप्त करें",
          "KYC सत्यापन पूर्ण करें",
          "आधार से लिंक करें",
          "मोबाइल बैंकिंग सेट करें"
            ],
            importantNotes: [
          "कोई प्रोसेसिंग शुल्क नहीं",
          "बीमा कवरेज शामिल",
          "लचीली चुकौती विकल्प",
          "ATMs पर उपयोग किया जा सकता है",
          "आपातकालीन क्रेडिट उपलब्ध",
          "वार्षिक नवीनीकरण आवश्यक",
          "महिला किसानों के लिए विशेष प्रावधान"
        ]
      },
      grants: {
        startupIndia: {
          title: "स्टार्टअप इंडिया कृषि अनुदान",
          description: "कृषि स्टार्टअप और नवोपक्रमांसाठी वित्तीय सहायता।",
          eligibility: "एग्री-टेक स्टार्टअप आणि नवोपक्रमकर्ते",
          benefits: [
            "₹25 लाख पर्यंत अनुदान",
            "मेंटरशिप सहायता",
            "तांत्रिक मार्गदर्शन",
            "बाजार संबंध",
            "प्रशिक्षण कार्यक्रम",
            "नेटवर्किंग संधी"
          ],
          documents: [
            "व्यवसाय योजना",
            "नवोपक्रम तपशील",
            "संघटना पात्रता",
            "आर्थिक अंदाज",
            "बाजार विश्लेषण",
            "तांत्रिक व्यवहार्यता रिपोर्ट"
          ],
          howToApply: [
            "स्टार्टअप इंडिया पोर्टल पर पंजीकरण करें",
            "विस्तृत प्रस्ताव सबमिट करा",
            "तांत्रिक मूल्यांकन प्राप्त करें",
            "निवड समितीसमोर सादर करें",
            "मंजुरी मिळवा",
            "अनुदान प्राप्त करें"
          ],
          importantNotes: [
            "नवोपक्रम केंद्रित असणे आवश्यक",
            "नियमित प्रगती अहवाल आवश्यक",
            "माइलस्टोन ट्रॅकिंग अनिवार्य",
            "लेखापरीक्षण आवश्यकताएं",
            "आईपी संरक्षण मार्गदर्शन",
            "बाजार प्रमाणीकरण आवश्यक"
          ]
        },
        agriExport: {
          title: "कृषी निर्यात अनुदान",
          description: "कृषी उत्पादों की निर्यात में शामिल किसानों और संगठनों के लिए सहायता।",
          eligibility: "कृषी उत्पादों का निर्यात करने वाले किसान और संगठन",
          benefits: [
            "निर्यात पायाभूत सुविधा सहायता",
            "गुणवत्ता प्रमाणन सहायता",
            "बाजार विकास सहायता",
            "प्रशिक्षण कार्यक्रम",
            "लॉजिस्टिक्स सहायता",
            "ब्रांड विकास"
          ],
          documents: [
            "निर्यात पंजीकरण",
            "व्यवसाय योजना",
            "बाजार विश्लेषण",
            "उत्पाद विवरण",
            "गुणवत्ता प्रमाणपत्र",
            "वित्तीय विवरण"
          ],
          howToApply: [
            "निर्यातकर्ता के रूप में पंजीकरण करें",
            "प्रस्ताव जमा करें",
            "तांत्रिक मूल्यांकन प्राप्त करें",
            "अनुमोदन प्राप्त करें",
            "योजना लागू करें",
            "लाभ प्राप्त करें"
          ],
          importantNotes: [
            "निर्यात केंद्रित होना आवश्यक",
            "गुणवत्ता मानके पूर्ण करना आवश्यक",
            "नियमित रिपोर्टिंग आवश्यक",
            "बाजार अनुपालन आवश्यक",
            "दस्तावेजीकरण अनिवार्य",
            "अनुवर्ती यात्राएं आवश्यक"
          ]
        },
        organicFarming: {
          title: "जैविक खेती अनुदान",
          description: "जैविक खेती में संक्रमण के लिए वित्तीय सहायता।",
          eligibility: "जैविक खेती करने वाले या संक्रमण करने वाले किसान",
          benefits: [
            "प्रमाणन सहायता",
            "इनपुट सहायता",
            "प्रशिक्षण कार्यक्रम",
            "बाजार संबंध",
            "बुनियादी ढांचा सहायता",
            "तकनीकी मार्गदर्शन"
          ],
          documents: [
            "जमीन स्वामित्व प्रमाण",
            "जैविक खेती योजना",
            "मृदा परीक्षण रिपोर्ट",
            "पिछली खेती रिकॉर्ड",
            "बाजार संबंध प्रमाण",
            "प्रशिक्षण प्रमाणपत्र"
          ],
          howToApply: [
            "जैविक खेती विभाग से संपर्क करें",
            "आवेदन जमा करें",
            "क्षेत्र निरीक्षण प्राप्त करें",
            "अनुमोदन प्राप्त करें",
            "जैविक पद्धती अंमलबजावणी करें",
            "प्रमाणन प्राप्त करें"
          ],
          importantNotes: [
            "जैविक मानके पूर्ण करणे आवश्यक",
            "नियमित निरीक्षण आवश्यक",
            "दस्तावेजीकरण अनिवार्य",
            "प्रशिक्षण उपस्थिति आवश्यक",
            "गुणवत्ता परीक्षण आवश्यक",
            "अनुवर्ती यात्राएं अनिवार्य"
          ]
        }
      },
    },
    modal: {
      eligibility: "पात्रता",
      benefits: "लाभ",
      requiredDocuments: "आवश्यक दस्तऐवज",
      howToApply: "अर्ज कसा करावा",
      importantNotes: "महत्वपूर्ण नोट्स",
      applyNow: "अभी आवेदन करें",
      learnMore: "और जानें"
    }
  }
};

const ResourceHubPage = () => {
    const [activeTab, setActiveTab] = useState('schemes');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { currentLanguage } = useLanguage();
    const t = translations[currentLanguage];
    const subsidyT = subsidyTranslations[currentLanguage];
    const grantT = grantTranslations[currentLanguage];
    const tipsT = farmingTipsTranslations[currentLanguage];
    const marketT = marketInfoTranslations[currentLanguage];

    const openModal = (item, type) => {
        setSelectedItem({ ...item, type });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const schemes = [
        {
            title: t.schemes.pmKisan.title,
            description: t.schemes.pmKisan.description,
            eligibility: t.schemes.pmKisan.eligibility,
            benefits: t.schemes.pmKisan.benefits,
            documents: t.schemes.pmKisan.documents,
            howToApply: t.schemes.pmKisan.howToApply,
            importantNotes: t.schemes.pmKisan.importantNotes,
            link: "https://pmkisan.gov.in/"
        },
        {
            title: t.schemes.kcc.title,
            description: t.schemes.kcc.description,
            eligibility: t.schemes.kcc.eligibility,
            benefits: t.schemes.kcc.benefits,
            documents: t.schemes.kcc.documents,
            howToApply: t.schemes.kcc.howToApply,
            importantNotes: t.schemes.kcc.importantNotes,
            link: "https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12345"
        }
    ];

    const subsidies = [
        {
            title: subsidyT.agriculturalMachinery.title,
            description: subsidyT.agriculturalMachinery.description,
            eligibleItems: subsidyT.agriculturalMachinery.eligibleItems,
            howToApply: subsidyT.agriculturalMachinery.howToApply,
            importantNotes: subsidyT.agriculturalMachinery.importantNotes,
            link: "https://agriculture.gov.in/subsidies"
        },
        {
            title: subsidyT.seedsAndFertilizers.title,
            description: subsidyT.seedsAndFertilizers.description,
            eligibleItems: subsidyT.seedsAndFertilizers.eligibleItems,
            howToApply: subsidyT.seedsAndFertilizers.howToApply,
            importantNotes: subsidyT.seedsAndFertilizers.importantNotes,
            link: "https://agriculture.gov.in/seeds-subsidies"
        },
        {
            title: subsidyT.greenhouses.title,
            description: subsidyT.greenhouses.description,
            eligibleItems: subsidyT.greenhouses.eligibleItems,
            howToApply: subsidyT.greenhouses.howToApply,
            importantNotes: subsidyT.greenhouses.importantNotes,
            link: "https://agriculture.gov.in/greenhouse-subsidies"
        }
    ];

    const grants = [
        {
            ...grantT.grants.startupIndia,
            link: "https://www.startupindia.gov.in/"
        },
        {
            ...grantT.grants.agriExport,
            link: "https://apeda.gov.in/"
        },
        {
            ...grantT.grants.organicFarming,
            link: "https://organic.icar.gov.in/"
        }
    ];

    const farmingTips = [
        {
            category: tipsT.categories.soilHealth.title,
            tips: tipsT.categories.soilHealth.tips
        },
        {
            category: tipsT.categories.waterManagement.title,
            tips: tipsT.categories.waterManagement.tips
        },
        {
            category: tipsT.categories.pestManagement.title,
            tips: tipsT.categories.pestManagement.tips
        }
    ];

    const marketInfo = [
        marketT.marketPrices,
        marketT.weatherForecast,
        marketT.bestPractices,
        marketT.marketDemand
    ];

    const renderModalContent = () => {
        if (!selectedItem) return null;

        switch (selectedItem.type) {
            case 'scheme':
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedItem.title}</h2>
                            <button className="close-button" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faCheckCircle} /> {t.eligibility}</h4>
                                <p>{selectedItem.eligibility}</p>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faHandHoldingUsd} /> {t.benefits}</h4>
                                <ul>
                                    {selectedItem.benefits.map((benefit, i) => (
                                        <li key={i}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faFileAlt} /> {t.requiredDocuments}</h4>
                                <ul>
                                    {selectedItem.documents.map((doc, i) => (
                                        <li key={i}>{doc}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faInfoCircle} /> {t.howToApply}</h4>
                                <ol>
                                    {selectedItem.howToApply.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faExclamationTriangle} /> {t.importantNotes}</h4>
                                <ul>
                                    {selectedItem.importantNotes.map((note, i) => (
                                        <li key={i}>{note}</li>
                                    ))}
                                </ul>
                            </div>

                            <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="apply-link">
                                {t.applyNow} <FontAwesomeIcon icon={faFileAlt} />
                            </a>
                        </div>
                    </div>
                );

            case 'subsidy':
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedItem.title}</h2>
                            <button className="close-button" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faCheckCircle} /> {selectedItem.eligibleItems.title}</h4>
                                <div className="eligible-items">
                                    {selectedItem.eligibleItems.items.map((item, i) => (
                                        <div key={i} className="eligible-item">
                                            <h5>{item.name}</h5>
                                            <p className="subsidy-amount">{item.subsidy}</p>
                                            <h6>Requirements:</h6>
                                            <ul>
                                                {item.requirements.map((req, j) => (
                                                    <li key={j}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faInfoCircle} /> {selectedItem.howToApply.title}</h4>
                                <ol>
                                    {selectedItem.howToApply.steps.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faExclamationTriangle} /> {selectedItem.importantNotes.title}</h4>
                                <ul>
                                    {selectedItem.importantNotes.notes.map((note, i) => (
                                        <li key={i}>{note}</li>
                                    ))}
                                </ul>
                            </div>

                            <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="apply-link">
                                {t.learnMore} <FontAwesomeIcon icon={faFileAlt} />
                            </a>
                        </div>
                    </div>
                );

            case 'tips':
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedItem.category}</h2>
                            <button className="close-button" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="tips-grid">
                                {selectedItem.tips.map((tip, i) => (
                                    <div key={i} className="tip-item">
                                        <h4>{tip.title}</h4>
                                        <p>{tip.description}</p>
                                        <div className="tip-meta">
                                            <span className="frequency">
                                                <FontAwesomeIcon icon={faInfoCircle} /> {tipsT.labels.frequency}: {tip.frequency}
                                            </span>
                                            <span className={`importance ${tip.importance.toLowerCase()}`}>
                                                <FontAwesomeIcon icon={faExclamationTriangle} /> {tipsT.labels.importance}: {tip.importance}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'market':
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedItem.title}</h2>
                            <button className="close-button" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="features-section">
                                <h4>Features</h4>
                                <ul>
                                    {selectedItem.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="source-section">
                                <p>{marketT.labels.source}: {selectedItem.source}</p>
                                <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="market-link">
                                    {marketT.labels.visitPortal} <FontAwesomeIcon icon={faFileAlt} />
                                </a>
                            </div>
                        </div>
                    </div>
                );

            case 'grant':
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedItem.title}</h2>
                            <button className="close-button" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faCheckCircle} /> {t.eligibility}</h4>
                                <p>{selectedItem.eligibility}</p>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faHandHoldingUsd} /> {t.benefits}</h4>
                                <ul>
                                    {selectedItem.benefits.map((benefit, i) => (
                                        <li key={i}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faFileAlt} /> {t.requiredDocuments}</h4>
                                <ul>
                                    {selectedItem.documents.map((doc, i) => (
                                        <li key={i}>{doc}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faInfoCircle} /> {t.howToApply}</h4>
                                <ol>
                                    {selectedItem.howToApply.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>

                            <div className="detail-section">
                                <h4><FontAwesomeIcon icon={faExclamationTriangle} /> {t.importantNotes}</h4>
                                <ul>
                                    {selectedItem.importantNotes.map((note, i) => (
                                        <li key={i}>{note}</li>
                                    ))}
                                </ul>
                            </div>

                            <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="apply-link">
                                {t.applyNow} <FontAwesomeIcon icon={faFileAlt} />
                            </a>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="resource-hub-page">
            <FarmerNavBar />
            <LanguageSelector />
            <div className="resource-hub-content">
                <h1>{t.title}</h1>
            
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'schemes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('schemes')}
                >
                        <FontAwesomeIcon icon={faHandHoldingUsd} /> {t.tabs.schemes}
                </button>
                <button 
                    className={`tab ${activeTab === 'subsidies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('subsidies')}
                >
                        <FontAwesomeIcon icon={faSeedling} /> {t.tabs.subsidies}
                </button>
                    <button 
                        className={`tab ${activeTab === 'grants' ? 'active' : ''}`}
                        onClick={() => setActiveTab('grants')}
                    >
                        <FontAwesomeIcon icon={faHandHoldingUsd} /> {t.tabs.grants}
                    </button>
                <button 
                    className={`tab ${activeTab === 'tips' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tips')}
                >
                        <FontAwesomeIcon icon={faTractor} /> {t.tabs.tips}
                </button>
                <button 
                    className={`tab ${activeTab === 'market' ? 'active' : ''}`}
                    onClick={() => setActiveTab('market')}
                >
                        <FontAwesomeIcon icon={faBook} /> {t.tabs.market}
                </button>
            </div>

            <div className="content">
                {activeTab === 'schemes' && (
                    <div className="schemes-container">
                        {schemes.map((scheme, index) => (
                            <div key={index} className="scheme-card">
                                <h3>{scheme.title}</h3>
                                    <p className="description">{scheme.description}</p>
                                    <button 
                                        className="view-details-button"
                                        onClick={() => openModal(scheme, 'scheme')}
                                    >
                                        {t.viewDetails}
                                    </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'subsidies' && (
                    <div className="subsidies-container">
                        {subsidies.map((subsidy, index) => (
                            <div key={index} className="subsidy-card">
                                <h3>{subsidy.title}</h3>
                                    <p className="description">{subsidy.description}</p>
                                    <button 
                                        className="view-details-button"
                                        onClick={() => openModal(subsidy, 'subsidy')}
                                    >
                                        {t.viewDetails}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'grants' && (
                        <div className="grants-container">
                            {grants.map((grant, index) => (
                                <div key={index} className="grant-card">
                                    <h3>{grant.title}</h3>
                                    <p className="description">{grant.description}</p>
                                    <button 
                                        className="view-details-button"
                                        onClick={() => openModal(grant, 'grant')}
                                    >
                                        {t.viewDetails}
                                    </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'tips' && (
                    <div className="tips-container">
                        {farmingTips.map((category, index) => (
                            <div key={index} className="tips-card">
                                <h3>{category.category}</h3>
                                    <button 
                                        className="view-details-button"
                                        onClick={() => openModal(category, 'tips')}
                                    >
                                        {t.viewDetails}
                                    </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'market' && (
                    <div className="market-container">
                        {marketInfo.map((info, index) => (
                            <div key={index} className="market-card">
                                <h3>{info.title}</h3>
                                    <p className="description">{info.description}</p>
                                    <button 
                                        className="view-details-button"
                                        onClick={() => openModal(info, 'market')}
                                    >
                                        {t.viewDetails}
                                    </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    {renderModalContent()}
                </div>
            )}
        </div>
    );
};

export default ResourceHubPage; 