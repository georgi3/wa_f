import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Container,Form, Button, Alert} from "react-bootstrap";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import SocialMediaLinks from "../components/SocialMediaLinks";
import { useNavigate,  useLocation } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import {apiCall, processUserData} from "../utils/apiUtils";


export default function SignInScreen(){
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const socialMedias = [
        {
            icon: faGoogle,
            href: `${process.env.REACT_APP_API_URL}/accounts/login/google-oauth2/`,
            color: "text-danger",
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
        <Container className={"waves-bg-secondary d-flex justify-content-center align-content-center vh-100 vw-100"} fluid>
            <Form className={"p-1"}
                   onSubmit={handleSubmit}>
                <Container className={"my-3 py-5 text-center"}>
                    <h1 className={"text-light fw-light"}>Sign in to WelfareAvenue</h1>
                </Container>
                <Form.Group className={"my-2 py-2"} controlId={"formSignInEmail"}>
                    <Form.Label className={"text-light lead fs-6 px-3"}>
                        E-mail
                    </Form.Label>
                    <Form.Control
                        className={"py-2 w-100"}
                        type={"text"}
                        placeholder={"Enter email"}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                </Form.Group>
                <Form.Group className={"my-2 py-2"}
                            controlId={"formSignInPassword"}>
                    <Form.Label className={"text-light lead fs-6 px-3"}>Password</Form.Label>
                    <Form.Control
                        className={"py-2 w-100"}
                        type={"password"}
                        placeholder={"Enter password"}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                </Form.Group>
                <Container className={"d-flex justify-content-center text-center"}>
                    <Container className={"d-flex justify-content-evenly"}>
                        <SocialMediaLinks socials={socialMedias}/>
                    </Container>
                </Container>
                {errorMessage && <Alert className={"bg-light"}>
                    <span className={"text-danger"}>{errorMessage}</span>
                </Alert>}
                <Container className={"d-flex justify-content-center align-content-center"}>
                    <Button
                        className={"w-75 btn btn-light"}
                        type={"submit"}>
                        Sign In
                    </Button>
                </Container>
                <Container>
                    <p className={"text-center py-3 text-light"}><Link to={"/password/request-reset/"} className={"fw-semibold text-light"}>Forgot password?</Link></p>
                </Container>
            </Form>
        </Container>
    )
}
