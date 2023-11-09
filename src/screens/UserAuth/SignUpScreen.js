import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Container, Form, Button, Alert} from "react-bootstrap";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {useAuth} from "../../context/AuthContext";
import {apiCall, processUserData} from "../../utils/apiUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './AuthScreens.css';

export default function SignUpScreen(){
    const { login } = useAuth();
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const setValidated = useState(false)[1];
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
        }
    };

    return (
        <section className={"waves-bg-primary vh-100"}>
            <div className={"row d-flex justify-content-center align-items-center h-100 m-0"}>
                <div className={"col-12 col-md-8 col-lg-6 col-xl-5"}>
                    <Form  onSubmit={handleSubmit} className={"card bg-dark text-white"}>
                        <div className="card-body p-5 mx-3">
                            <a className={"text-light"} href={"/"}>Go back to WelfareAvenue</a>
                            <Container className={"py-5 my-3 text-center"}>
                                <h1 className={"text-light lead fs-1"}>Join our Community!</h1>
                            </Container>
                            <Form.Group className={"form-outline mb-4"}
                                        controlId={"formRegistrationFName"}>
                                <Form.Label className={"text-light lead fs-6 px-3"}>
                                    First Name
                                </Form.Label>
                                <Form.Control
                                            className={"form-control-lg"}
                                            type={"text"}
                                            placeholder={"Enter your first name"}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required/>
                            </Form.Group>
                            <Form.Group className={"form-outline mb-4"}
                                        controlId={"formRegistrationLName"}>
                                <Form.Label className={"text-light lead fs-6 px-3"}>
                                    Last Name
                                </Form.Label>
                                <Form.Control
                                            className={"form-control-lg"}
                                            type={"text"}
                                            placeholder={"Enter your last name"}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required/>
                            </Form.Group>
                            <Form.Group className={"form-outline mb-4"}
                                        controlId={"formRegistrationEmail"}>
                                <Form.Label className={"text-light lead fs-6 px-3"}>
                                    E-mail
                                </Form.Label>
                                <Form.Control
                                            className={"form-control-lg"}
                                            type={"email"}
                                            placeholder={"Enter email"}
                                            onChange={(e) => setEmail(e.target.value)}
                                required/>
                            </Form.Group>
                            <Form.Group className={"form-outline mb-4"}
                                        controlId={"formRegistrationPassword"}>
                                <Form.Label className={"text-light lead fs-6 px-3"}>
                                    Password
                                </Form.Label>
                                <Form.Control
                                            className={"form-control-lg"}
                                            type={"password"}
                                            placeholder={"Enter password"}
                                            onChange={(e) => setPassword(e.target.value)}
                                            minLength={8}
                                            required/>
                            </Form.Group>
                            <Form.Group className={"form-outline mb-4"}
                                        controlId={"formRegistrationPassword2"}>
                                <Form.Label className={"text-light lead fs-6 px-3"}>
                                    Repeat Password
                                </Form.Label>
                                <Form.Control
                                            className={"form-control-lg"}
                                            type={"password"}
                                            placeholder={"Repeat your password"}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            minLength={8}
                                            required/>
                                {!passwordsMatch && <p className={"danger text-danger"}>
                                    Passwords do not match.
                                </p>
                                }
                            </Form.Group>
                            <Container className={"d-flex justify-content-center align-content-center align-items-center flex-column my-3"}>
                                <Button className={"btn-outline-light btn-lg px-5 my-3"}
                                        type={"submit"}>
                                    SIGN UP
                                </Button>
                                {
                                socialMedias.map((socialMedia) => 
                                    <Button className={"btn-outline-light btn-lg px-5 my-3"}
                                        href={`${socialMedia.href}?next=${sessionStorage.getItem('returnUrl') || '/'}`}
                                        target={socialMedia.target}>
                                        <FontAwesomeIcon icon={socialMedia.icon} className={socialMedia.color} size="xl" />
                                        &nbsp;&nbsp;&nbsp;SIGN UP WITH {socialMedia.name}
                                    </Button>
                                    )
                                }
                            </Container>
                            {errorMessage && <Alert className={"bg-light"}>
                                <span className={"text-danger"}>{errorMessage}</span>
                            </Alert>}
                            <Container className={"mt-2"}>
                                <p className={"text-center text-light"}>Already have an account? <Link to={"/signin"} className={"fw-semibold text-light"}>Log In Here</Link></p>
                            </Container>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    )
}

