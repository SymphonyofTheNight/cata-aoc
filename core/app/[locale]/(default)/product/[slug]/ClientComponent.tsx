"use client" // Ensures this code runs only on the client

import { useEffect } from 'react';

const ClientComponent = () => {
    useEffect(() => {
        const getMainComponent = document.querySelector('#main-container') as HTMLElement | null;

        if (getMainComponent) {
            if (window.location.href === '/') {
                getMainComponent.style.backgroundColor = '#F5F5F5'; // Home page background color
            } else {
                getMainComponent.style.backgroundColor = '#ffffff'; // Other pages background color
            }
            // Force the background color to apply using !important
            getMainComponent.style.setProperty('background-color', getMainComponent.style.backgroundColor, 'important');
        }
    }, []); // Empty dependency array ensures this runs once after the component mounts

    return <></>; // No UI, just side effects
};

export default ClientComponent;
