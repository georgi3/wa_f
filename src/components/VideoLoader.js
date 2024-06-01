import React, { useState } from 'react';
import { quantum } from 'ldrs';

quantum.register();

// Create a video loader component
export default function VideoLoader({ src, ...props }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLoadedData = () => {
        setLoading(false);
    }

    const handleLoadingError = (event) => {
        setError(event.message);
        setLoading(false);
    }

    return (
        <div className="w-100 d-flex justify-content-center text-center align-items-center">
            {loading && <l-quantum size="85" speed="1.75" color="#711d94"></l-quantum>}
            {error && <p className={"text-danger"}>{error}</p>}

            <video {...props} style={{display: loading ? 'none' : 'block'}} onLoadedData={handleLoadedData} onError={handleLoadingError}>
                <source src={src} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}