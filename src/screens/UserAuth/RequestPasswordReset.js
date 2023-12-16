import React, { useState } from "react";
import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";


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
        <section className={"waves-bg-primary vh-100"}>
            <div className={"row d-flex justify-content-center align-items-center h-100 m-0"}>
                <div className={"col-12 col-md-8 col-lg-6 col-xl-5"}>
                    <Form  onSubmit={handleSubmit} className={"card bg-dark text-white"}>
                        <div className="card-body p-5">
                            <Container className={"py-5 my-3 text-center"}>
                                <h1 className={"text-light lead fs-1"}>Request Password Reset</h1>
                            </Container>
                            <Form.Group className="my-4 py-2">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Container className={"d-flex justify-content-center align-content-center pt-3"}>
                                <Button className={"btn-outline-light btn-lg px-5"} type={"submit"}>
                                    Reset Password
                                </Button>
                            </Container>
                            {feedback && <p>{feedback}</p>}
                            <Container>
                                <p className={"text-center py-3 text-light"}>
                                    <Link to={"/signin/"} className={"fw-semibold text-light"}>Back to Login</Link> &nbsp;| &nbsp;
                                    <Link to={"/signup/"} className={"fw-semibold text-light"}>Create an account</Link>
                                </p>
                            </Container>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}

export default RequestPasswordReset;
