import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Container, Form, Button, Alert} from "react-bootstrap";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {useAuth} from "../../context/AuthContext";
import {apiCall, processUserData} from "../../utils/apiUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './AuthScreens.scss';

export default function SignUpScreen(){
    const { login } = useAuth();
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [validated, setValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
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
            sessionStorage.setItem('returnUrl', returnUrl);
        }
    }, [location]);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || password !== confirmPassword) {
            if (password !== confirmPassword){
                setPasswordsMatch(false);
            }
            event.preventDefault();
            event.stopPropagation();
        } else{
            setPasswordsMatch(true);
            handleRegister(event);
        }
        setValidated(true);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            const data = await apiCall(`${process.env.REACT_APP_API_URL}/api/users/register`, 'POST', {}, {
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'username': email,
                'password': password,
            });
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
                <Form onSubmit={handleSubmit} className={"auth-card auth-form"} validated={validated}>
                    <div className="auth-card-body">
                        <a className={"auth-back-link"} href={"/"}>&larr; Go back to WelfareAvenue</a>
                        <Container className={"mt-4 mb-4 px-0"}>
                            <div className={"auth-kicker"}>Join the movement</div>
                            <h1 className={"auth-title"}>Create your account</h1>
                            <p className={"auth-subtitle"}>Volunteer, track your applications, and stay in the loop.</p>
                        </Container>
                        {errorMessage && (
                            <Alert className={"auth-alert"}>
                                <span>{errorMessage}</span>
                            </Alert>
                        )}
                        <Form.Group className={"mb-3"} controlId={"formRegistrationFName"}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type={"text"}
                                placeholder={"Enter your first name"}
                                onChange={(e) => setFirstName(e.target.value)}
                                required/>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"formRegistrationLName"}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type={"text"}
                                placeholder={"Enter your last name"}
                                onChange={(e) => setLastName(e.target.value)}
                                required/>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"formRegistrationEmail"}>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type={"email"}
                                placeholder={"you@community.org"}
                                onChange={(e) => setEmail(e.target.value)}
                                required/>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"formRegistrationPassword"}>
                            <Form.Label>Password</Form.Label>
                            <div className={"auth-input-group"}>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder={"Enter password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={8}
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
                        <Form.Group className={"mb-4"} controlId={"formRegistrationPassword2"}>
                            <Form.Label>Repeat Password</Form.Label>
                            <div className={"auth-input-group"}>
                                <Form.Control
                                    type={showConfirm ? "text" : "password"}
                                    placeholder={"Repeat your password"}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    minLength={8}
                                    required/>
                                <Button
                                    variant="outline-primary"
                                    className={"auth-secondary-btn"}
                                    type="button"
                                    onClick={() => setShowConfirm((prev) => !prev)}>
                                    {showConfirm ? "Hide" : "Show"}
                                </Button>
                            </div>
                            {!passwordsMatch && (
                                <p className={"text-danger mt-2"}>
                                    Passwords do not match.
                                </p>
                            )}
                        </Form.Group>
                        <Container className={"d-flex flex-column gap-3"}>
                            <Button className={"auth-primary-btn"} type={"submit"} disabled={isSubmitting}>
                                {isSubmitting ? "Creating account..." : "Create account"}
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
                                Already have an account? <Link to={"/signin"} className={"fw-semibold"}>Log in here</Link>
                            </p>
                        </Container>
                    </div>
                </Form>
            </div>
        </section>
    )
}

