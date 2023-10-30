import React, { useEffect, useState } from 'react';
import './Loader.scss'; // Import the CSS file

function LoaderComponent() {
    const [loading, setLoading] = useState(true);

    // Simulate loading for 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>

    );
}

export default LoaderComponent;
