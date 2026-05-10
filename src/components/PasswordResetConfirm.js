import React, { useState } from "react";
import {Link, useParams} from "react-router-dom";
import {Alert, Button, Container, Form} from "react-bootstrap";
import "../screens/UserAuth/AuthScreens.scss";

function PasswordResetConfirm() {
    const { uid, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/users/reset_password_confirm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: uid,
                    token: token,
                    new_password: password
                }),
            });
            if (response.status===204){
                setMessage('Your password has been reset successfully.');
                setErrorMessage('');
            }else{
                const responseData = await response.json();
                setErrorMessage(responseData.new_password[0])
            }
        } catch (error) {
            setErrorMessage('There was an error processing your request.');
        }
    };


    return (
        <section className="auth-screen">
            <div className="auth-screen-content">
                <Form onSubmit={handleSubmit} className="auth-card auth-form">
                    <div className="auth-card-body">
                        <Link className={"auth-back-link"} to={"/signin/"}>&larr; Back to sign in</Link>
                        <Container className={"mt-4 mb-4 px-0"}>
                            <div className={"auth-kicker"}>Secure your account</div>
                            <h1 className={"auth-title"}>Reset your password</h1>
                            <p className={"auth-subtitle"}>Choose a new password and confirm it below to finish the reset process.</p>
                        </Container>
                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="New password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="confirmNewPassword">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className={"d-flex flex-column gap-3"}>
                            <Button className="auth-primary-btn" type="submit">Confirm Password Reset</Button>
                        </div>
                        {message && <Alert className="auth-feedback auth-feedback--success border-0">{message}</Alert>}
                        {errorMessage && <Alert className="auth-feedback auth-feedback--error border-0">{errorMessage}</Alert>}
                    </div>
                </Form>
            </div>
        </section>
    );
}

export default PasswordResetConfirm;
