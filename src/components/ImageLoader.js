import React from "react";
import MediaLoader from "./MediaLoader";

export default function ImageLoader({ src, ...props }) {
    return <MediaLoader {...props} src={src} type="image" />;
}