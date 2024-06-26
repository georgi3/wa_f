import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {faInstagram, faTiktok, faLinkedin, faGoogle} from "@fortawesome/free-brands-svg-icons";
import SocialMediaLinks from "../SocialMediaLinks";
import {useAuth} from "../../context/AuthContext";
import ContactForm from '../ContactForm/ContactForm';
import NewsletterForm from '../NewsletterForm/NewsletterForm';

import './Footer.scss';

const socialMedias = [
    {
        icon: faInstagram,
        href: "https://www.instagram.com/welfareavenue/",
        color: "text-light",
        target: "_blank"
    },
    {
        icon: faGoogle,
        href: "https://g.page/r/CVcrTC0okpYpEB0/review",
        color: "text-light",
        target: "_blank"
    },
    {
        icon: faLinkedin,
        href: "https://www.linkedin.com/company/75487020/admin/",
        color: "text-light",
        target: "_blank"
    },
    {
        icon: faTiktok,
        href: "https://www.tiktok.com/@welfareavenue",
        color: "text-light",
        target: "_blank"
    },
];

export default function Footer() {
    const { user } = useAuth();

    return (
        <Container className="transitioning-background-primary fs-6" fluid>
            <Row className="py-3">
                <Col sm={12} md={12} lg={6}>
                    <NewsletterForm style={{"padding": "0 40px"}} />
                </Col>
                <Col sm={12} md={12} lg={6}>
                    <h3 className="text-light my-3 fs-2">Get in Touch</h3>
                    <ContactForm user={user}/>
                </Col>
            </Row>
            <Row>
                <h3 className="text-light my-3 fs-2">Contact Information</h3>
                <ContactInfo />
            </Row>
            <Container className={"text-light"}>
                <SocialMediaLinks socials={socialMedias}/>
            </Container>
            <Row>
                <Col className={"waves-bg-primary"}>
                    <FooterLine/>
                </Col>
            </Row>
        </Container>
    )
}


function ContactInfo() {
    return (
        <Container className="text-light container-sm px-3 py-6 px-sm-0">
            <Row className="p-1 pb-3 px-sm-0 text-left">
                <Col>Telephone:</Col>
                <Col><a href="tel:+1-438-808-7754" className="link-light">+1-(438)-808-7754</a></Col>
            </Row>
            <Row className="p-1 pb-3 px-sm-0 text-left">
                <Col>Email:</Col>
                <Col><a href="mailto:info@welfareavenue.com" className="link-light">info@welfareavenue.com</a></Col>
            </Row>
        </Container>
    )
}

function FooterLine() {
    return (
        <Container  fluid>
            <p className="text-center text-light align-middle my-1 py-2">Copyright &copy; Welfare Avenue {new Date().getFullYear()}</p>
        </Container>
    )
}