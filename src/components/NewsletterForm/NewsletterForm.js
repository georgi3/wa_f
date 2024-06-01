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
        <Container className={"newsletter-form " + props.dataTheme} {...props}>
            <div className="form__group input">
                <input type="email" className={"form__input"} placeholder="Email address" disabled/>
            </div>
            <div className="form__group button">
                <input type="submit" className={"form__btn"} value="Subscribe" onClick={newsletterSubmit} disabled/>
            </div>
        </Container>
    )
}