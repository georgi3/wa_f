import React, { useState } from 'react';
// import React, { Image, useState } from 'react';
import { quantum } from 'ldrs';

quantum.register();

// Create a video loader component
export function ImageLoader({ src, ...props }) {
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

            {/*<Image {...props} src={src} style={{display: loading ? 'none' : 'block'}} onLoadedData={handleLoadedData} onError={handleLoadingError}>*/}
            {/*</Image>*/}
        </div>
    );
}