import React from "react";
import MediaLoader from "./MediaLoader";

export default function VideoLoader({ src, ...props }) {
    return <MediaLoader {...props} src={src} type="video" />;
}