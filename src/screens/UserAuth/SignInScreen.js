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
        try {
            const data = await apiCall(`${process.env.REACT_APP_API_URL}/api/users/login`, 'POST', {}, { 'username': email, 'password': password });
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
                    <Form className={"card bg-dark text-white"}
                        onSubmit={handleSubmit}>
                        <div className="card-body p-5">
                            <a className={"text-light"} href={"/"}>Go back to WelfareAvenue</a>
                            <Container className={"my-3 py-5 text-center"}>
                                <h1 className={"text-light fw-light"}>Sign in to WelfareAvenue</h1>
                            </Container>
                            <Form.Group className={"my-2 py-2"} controlId={"formSignInEmail"}>
                                <Form.Label className={"text-light lead fs-6 px-3"}>
                                    E-mail
                                </Form.Label>
                                <Form.Control
                                    className={"py-2 w-100 form-control-lg"}
                                    type={"text"}
                                    placeholder={"Enter email"}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required/>
                            </Form.Group>
                            <Form.Group className={"my-2 py-2"}
                                        controlId={"formSignInPassword"}>
                                <Form.Label className={"text-light lead fs-6 px-3"}>Password</Form.Label>
                                <Form.Control
                                    className={"py-2 w-100 form-control-lg"}
                                    type={"password"}
                                    placeholder={"Enter password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required/>
                            </Form.Group>
                            <Container className={"d-flex justify-content-center align-content-center align-items-center flex-column"}>
                                <Button className={"btn-outline-light btn-lg px-5 my-3"}
                                        type={"submit"}>
                                    LOGIN
                                </Button>
                                {
                                socialMedias.map((socialMedia) => 
                                    <Button className={"btn-outline-light btn-lg px-5 my-3"}
                                        href={`${socialMedia.href}?next=${sessionStorage.getItem('returnUrl') || '/'}`}
                                        target={socialMedia.target}>
                                        <FontAwesomeIcon icon={socialMedia.icon} className={socialMedia.color} size="xl" />
                                        &nbsp;&nbsp;&nbsp;SIGN IN WITH {socialMedia.name}
                                    </Button>
                                    )
                                }
                            </Container>
                            {errorMessage && <Alert className={"bg-light"}>
                                <span className={"text-danger"}>{errorMessage}</span>
                            </Alert>}
                            <Container>
                                <p className={"text-center py-3 text-light"}>
                                    <Link to={"/password/request-reset/"} className={"fw-semibold text-light"}>Forgot password?</Link> &nbsp;| &nbsp;
                                    <Link to={"/signup/"} className={"fw-semibold text-light"}>Create an account</Link>
                                </p>
                            </Container>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    )
}
