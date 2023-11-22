"use client"
import React, { useEffect } from 'react';

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: {
            translate: {
                TranslateElement: any;
            };
        };
    }
}

const GoogleTranslateWrapper = () => {
    useEffect(() => {
        // Load Google Translate script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);

        // Initialize Google Translate element
        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement({ pageLanguage: 'it' }, 'google_translate_element');
        };
    }, []);

    return <div id="google_translate_element"></div>;
};

export default GoogleTranslateWrapper;
