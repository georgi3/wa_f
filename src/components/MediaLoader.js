import React, { useState } from "react";
import { quantum } from "ldrs";

quantum.register();

export default function MediaLoader({ src, type = "image", videoType = "video/mp4", ...props }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLoaded = () => {
        setLoading(false);
    };

    const handleError = (event) => {
        setError(event?.message || "Failed to load media");
        setLoading(false);
    };

    return (
        <div className="w-100 d-flex justify-content-center text-center align-items-center">
            {loading && <l-quantum size="85" speed="1.75" color="#711d94"></l-quantum>}
            {error && <p className="text-danger">{error}</p>}
            {type === "video" ? (
                <video
                    {...props}
                    style={{ display: loading ? "none" : "block" }}
                    onLoadedData={handleLoaded}
                    onError={handleError}
                >
                    <source src={src} type={videoType} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img
                    {...props}
                    src={src}
                    style={{ display: loading ? "none" : "block" }}
                    onLoad={handleLoaded}
                    onError={handleError}
                />
            )}
        </div>
    );
}
