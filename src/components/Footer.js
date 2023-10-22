import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import {faInstagram, faTiktok, faLinkedin, faGoogle} from "@fortawesome/free-brands-svg-icons";
import SocialMediaLinks from "./SocialMediaLinks";
import {useAuth} from "../context/AuthContext";
import { apiCall } from '../utils/apiUtils';

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
        <Container className="transitioning-background-primary lead fs-6" fluid>
            <Row className="py-3">
                <Col sm={12} md={12} lg={6}>
                    <h3 className="text-light my-3 lead  fs-2">Contact Information</h3>
                    <ContactInfo />
                </Col>
                <Col sm={12} md={12} lg={6}>
                    <h3 className="text-light my-3 lead fs-2">Get in Touch</h3>
                    <ContactForm user={user}/>
                </Col>
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
        <Container className="text-light container-md px-3 py-5 px-sm-0" fluid>
            <Row className="p-1 pb-3 px-sm-0 d-flex justify-content-between">
                <Col>Telephone:</Col>
                <Col><a href="tel:+1-438-808-7754" className="link-light">+1-(438)-808-7754</a></Col>
            </Row>
            <Row className="p-1 pb-3 px-sm-0 d-flex justify-content-between">
                <Col>Email:</Col>
                <Col><a href="mailto:info@welfareavenue.com" className="link-light">info@welfareavenue.com</a></Col>
            </Row>
        </Container>
    )
}

function InputField({ id, type, defaultValue, placeholder, onChange }) {
    return (
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label className={"float-start"}>{placeholder}</Form.Label>
            <Form.Control
                type={type}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
            required/>
        </Form.Group>
    );
}

function TextAreaField({ id, defaultValue, placeholder, onChange }) {
    return (
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label className={"float-start"}>{placeholder}</Form.Label>
            <Form.Control
                as="textarea"
                defaultValue={defaultValue}
                onChange={onChange}
            required/>
        </Form.Group>
    );
}

function ContactForm({ user }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [error, setError] = useState(false);


    useEffect(() => {
        setEmail(user?.email)
    }, [user?.email]);

    useEffect(() => {
        (user?.firstName ? setName(`${user?.firstName} ${user?.lastName}`) : setName(""))
    }, [user?.firstName, user?.lastName]);
    const handleSubmit =  (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            submitForm(e);
        }
    };
    const submitForm = async (e) =>{
        e.preventDefault();
        try {
            const response = await apiCall(`${process.env.REACT_APP_API_URL}/api/contact-form-submission`, "POST", {}, {
                email: email,
                name: name,
                subject: subject,
                content: content
            });
            if (response && response.detail) {
                setServerMessage(response.detail);
                setError(false);
            }
        } catch (error) {
                setServerMessage('An unknown error occurred. Please try again.');
                setError(true);
            console.error("There was an error sending the message", error.message);
        }
    };


    return (
        <Container className="px-3 pb-5 pt-2 text-light" fluid>
            <Form id={"getInTouchId"}
                  onSubmit={handleSubmit}>
                <InputField
                    id="email"
                    type="email"
                    defaultValue={email}
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                    id="name"
                    type="text"
                    defaultValue={name}
                    placeholder="Your Full Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <InputField
                    id="subject"
                    type="text"
                    defaultValue={subject}
                    placeholder="Subject"
                    onChange={(e) => setSubject(e.target.value)}
                />

                <TextAreaField
                    id="content"
                    defaultValue={content}
                    placeholder="Your Message"
                    onChange={(e) => setContent(e.target.value)}
                />
                {serverMessage && (
                    <div className={"bg-light rounded-3 mt-3"}>
                        <p className={`m-3 ${!error ? 'text-success' : 'text-danger'}`}>{serverMessage}</p>
                    </div>
                )}

                <Button className="w-100 btn btn-light mx-auto"  type="submit">
                    Send us a message
                </Button>
            </Form>
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

