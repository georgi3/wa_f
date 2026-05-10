import React from "react";
import { Container } from "react-bootstrap";
import ImageLoader from "./ImageLoader";

export default function PostActionLayout({
    wrapperClassName = "",
    imageClassName = "",
    imageSrc,
    imageAlt,
    children
}) {
    return (
        <Container className={`post-action ${wrapperClassName}`.trim()}>
            <Container className="post-action__box">
                <div className="post-action__media">
                    <ImageLoader className={`post-action__image ${imageClassName}`.trim()} src={imageSrc} alt={imageAlt} />
                </div>
                <div className="post-action__content">
                    {children}
                </div>
            </Container>
        </Container>
    );
}
