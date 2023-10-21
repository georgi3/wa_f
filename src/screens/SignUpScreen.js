import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Container, Form, Button, Alert} from "react-bootstrap";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import SocialMediaLinks from "../components/SocialMediaLinks";
import {useAuth} from "../context/AuthContext";
import {apiCall, processUserData} from "../utils/apiUtils";

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
    const navigate = useNavigate();
    const location = useLocation();

    const socialMedias = [
        {
            icon: faGoogle,
            href: "http://127.0.0.1:8000/accounts/login/google-oauth2/",
            color: "text-danger",
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
            const data = await apiCall('/api/users/register', 'POST', {}, {
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
        <Container className={"waves-bg-secondary d-flex justify-content-center align-content-center vh-100 vw-100"} fluid>
            <Form  onSubmit={handleSubmit}>
                <Container className={"py-2 text-center"}>
                    <h1 className={"text-light lead fs-1"}>Join our Community!</h1>
                </Container>
                <Form.Group className={" my-2 py-2"}
                            controlId={"formRegistrationFName"}>
                    <Form.Label className={"text-light lead fs-6 px-3"}>
                        First Name
                    </Form.Label>
                    <Form.Control className={"py-2 w-100"}
                                  type={"text"}
                                  placeholder={"Enter your first name"}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  required/>
                </Form.Group>
                <Form.Group className={" my-2 py-2"}
                            controlId={"formRegistrationLName"}>
                    <Form.Label className={"text-light lead fs-6 px-3"}>
                        Last Name
                    </Form.Label>
                    <Form.Control className={"py-2 w-100"}
                                  type={"text"}
                                  placeholder={"Enter your last name"}
                                  onChange={(e) => setLastName(e.target.value)}
                                  required/>
                </Form.Group>
                <Form.Group className={" my-2 py-2"}
                            controlId={"formRegistrationEmail"}>
                    <Form.Label className={"text-light lead fs-6 px-3"}>
                        E-mail
                    </Form.Label>
                    <Form.Control className={"py-2 w-100"}
                                  type={"email"}
                                  placeholder={"Enter email"}
                                  onChange={(e) => setEmail(e.target.value)}
                    required/>
                </Form.Group>
                <Form.Group className={" my-2 py-2"}
                            controlId={"formRegistrationPassword"}>
                    <Form.Label className={"text-light lead fs-6 px-3"}>
                        Password
                    </Form.Label>
                    <Form.Control className={"py-2 w-100"}
                                  type={"password"}
                                  placeholder={"Enter password"}
                                  onChange={(e) => setPassword(e.target.value)}
                                  minLength={8}
                                  required/>
                </Form.Group>
                <Form.Group className={" my-2 py-2"}
                            controlId={"formRegistrationPassword2"}>
                    <Form.Label className={"text-light lead fs-6 px-3"}>
                        Repeat Password
                    </Form.Label>
                    <Form.Control className={"py-2 w-100"}
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
                <SocialMediaLinks socials={socialMedias}/>
                    {errorMessage && <Alert className={"bg-light"}>
                        <span className={"text-danger"}>{errorMessage}</span>
                    </Alert>}
                <Container className={"d-flex justify-content-center align-content-center"}>
                    <Button className={"w-100 btn btn-light"}
                            type={"submit"}>
                        Sign Up
                    </Button>
                </Container>
                <Container>
                    <p className={"text-center py-3 text-light"}>Already have an account? <Link to={"/signin"} className={"fw-semibold"}>Log In Here</Link></p>
                </Container>
            </Form>
        </Container>
    )
}

