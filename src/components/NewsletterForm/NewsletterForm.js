import React from "react";
import './NewsletterForm.scss';

export default function NewsletterForm({...props}) {
    if (!props.dataTheme) {
        props.dataTheme = "dark";
    }
    
    return (
        <div className="keela-embed-form" data-src="https://signup-can.keela.co/embed/2ZN6rsbq4jaTvHGt6">
            <div className="keela-loading"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}