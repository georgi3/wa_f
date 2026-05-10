import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Container,Form, Button, Alert} from "react-bootstrap";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import { useNavigate,  useLocation } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import {apiCall, processUserData} from "../../utils/apiUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './AuthScreens.scss';

export default function SignInScreen(){
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validated, setValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const socialMedias = [
        {
            name: "GOOGLE",
            icon: faGoogle,
            href: `${process.env.REACT_APP_API_URL}/accounts/login/google-oauth2/`,
            color: "text-light",
            target: "_self"
        },
    ];
    useEffect(() => {
        const returnUrl = location.state?.from
        if (returnUrl){
            console.log(returnUrl)
            sessionStorage.setItem('returnUrl', returnUrl);
        }
    }, [location]);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else{
            handleLogin(event);
        }
        setValidated(true);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            const data = await apiCall(`${process.env.REACT_APP_API_URL}/api/users/login`, 'POST', {}, { 'username': email, 'password': password });
            await login(processUserData(data));
            navigate(location.state?.from || '/user-profile');
        } catch (error) {
            console.error('Error logging in:', error.message || error);
            setErrorMessage(error.message || 'Unknown error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={"waves-bg-primary auth-screen"}>
            <div className={"auth-screen-content"}>
                <Form className={"auth-card auth-form"} validated={validated} onSubmit={handleSubmit}>
                    <div className="auth-card-body">
                        <a className={"auth-back-link"} href={"/"}>&larr; Go back to WelfareAvenue</a>
                        <Container className={"mt-4 mb-4 px-0"}>
                            <div className={"auth-kicker"}>Welcome back</div>
                            <h1 className={"auth-title"}>Sign in to WelfareAvenue</h1>
                            <p className={"auth-subtitle"}>Continue your impact, check your volunteer status, and see what is next.</p>
                        </Container>
                        {errorMessage && (
                            <Alert className={"auth-alert"}>
                                <span>{errorMessage}</span>
                            </Alert>
                        )}
                        <Form.Group className={"mb-3"} controlId={"formSignInEmail"}>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type={"email"}
                                placeholder={"you@community.org"}
                                onChange={(e) => setEmail(e.target.value)}
                                required/>
                        </Form.Group>
                        <Form.Group className={"mb-4"} controlId={"formSignInPassword"}>
                            <Form.Label>Password</Form.Label>
                            <div className={"auth-input-group"}>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder={"Enter password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required/>
                                <Button
                                    variant="outline-primary"
                                    className={"auth-secondary-btn"}
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </div>
                        </Form.Group>
                        <Container className={"d-flex flex-column gap-3"}>
                            <Button className={"auth-primary-btn"} type={"submit"} disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Log in"}
                            </Button>
                            {socialMedias.map((socialMedia) => (
                                <Button
                                    key={socialMedia.name}
                                    variant="outline-primary"
                                    className={"auth-secondary-btn"}
                                    href={`${socialMedia.href}?next=${sessionStorage.getItem('returnUrl') || '/'}`}
                                    target={socialMedia.target}>
                                    <FontAwesomeIcon icon={socialMedia.icon} size="lg" />
                                    &nbsp;&nbsp;Continue with {socialMedia.name}
                                </Button>
                            ))}
                        </Container>
                        <Container className={"auth-footer-links mt-4"}>
                            <p className={"text-center text-muted"}>
                                <Link to={"/password/request-reset/"} className={"fw-semibold"}>Forgot password?</Link> &nbsp;| &nbsp;
                                <Link to={"/signup/"} className={"fw-semibold"}>Create an account</Link>
                            </p>
                        </Container>
                    </div>
                </Form>
            </div>
        </section>
    )
}
