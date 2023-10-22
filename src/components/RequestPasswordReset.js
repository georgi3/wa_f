import React, { useState } from "react";
import {Button, Container, Form} from "react-bootstrap";


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
    <Container className={"d-flex justify-content-center align-content-center vh-100 vw-100 mt-5"} fluid>
        <Form onSubmit={handleSubmit}>
            <Container className={"py-2 text-center mb-5"}>
                <h1 className={"text-center lead fs-2 text-primary"}>Request Password Reset</h1>
            </Container>
            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Group>
            <Container className={"d-flex justify-content-center align-content-center"}>
                <Button variant="info" type="submit">Reset Password</Button>
            </Container>
            {feedback && <p>{feedback}</p>}

        </Form>
    </Container>
    );
}

export default RequestPasswordReset;
