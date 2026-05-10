import React, { useState } from "react";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./AuthScreens.scss";


function RequestPasswordReset() {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/users/reset_password/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (response.status===204) {
            setFeedback("Email has been sent! Please check your inbox.");
        }
    };

    return (
        <section className={"waves-bg-primary auth-screen"}>
            <div className="auth-screen-content">
                <Form onSubmit={handleSubmit} className={"auth-card auth-form"}>
                    <div className="auth-card-body">
                        <Link className={"auth-back-link"} to={"/signin/"}>&larr; Back to sign in</Link>
                        <Container className={"mt-4 mb-4 px-0"}>
                            <div className={"auth-kicker"}>Recover your account</div>
                            <h1 className={"auth-title"}>Request password reset</h1>
                            <p className={"auth-subtitle"}>Enter the email address tied to your account and we will send you reset instructions.</p>
                        </Container>
                        <Form.Group className="mb-4" controlId="resetEmail">
                            <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="you@community.org"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                        </Form.Group>
                        <div className={"d-flex flex-column gap-3"}>
                            <Button className={"auth-primary-btn"} type={"submit"}>
                                Reset Password
                            </Button>
                        </div>
                        {feedback && <Alert className="auth-feedback auth-feedback--success border-0">{feedback}</Alert>}
                        <Container className={"auth-footer-links mt-4 px-0"}>
                            <p className={"text-center text-muted"}>
                                <Link to={"/signin/"} className={"fw-semibold"}>Back to Login</Link> &nbsp;| &nbsp;
                                <Link to={"/signup/"} className={"fw-semibold"}>Create an account</Link>
                            </p>
                        </Container>
                    </div>
                </Form>
            </div>
        </section>
    );
}

export default RequestPasswordReset;
