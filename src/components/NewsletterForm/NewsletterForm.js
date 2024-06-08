import React from "react";
import {Helmet} from "react-helmet";
import {Container} from "react-bootstrap";
import './NewsletterForm.scss';

export default function NewsletterForm({...props}) {

    function newsletterSubmit(e) {
        e.preventDefault();
        if (window.gtag) {
            window.gtag('event', 'newsletter-signup' , { 'event_category': 'engagement', 'event_label': 'newsletter-signup', 'value': '1' });
        } else {
            console.log("gtag not found");
        }
    }

    if (!props.dataTheme) {
        props.dataTheme = "dark";
    }
    
    return (
        <div class="keela-embed-form" data-src="https://signup-can.keela.co/embed/2ZN6rsbq4jaTvHGt6">
            <div class="keela-loading"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}