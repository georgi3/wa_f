import React, { useState } from "react";
import {useParams} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";

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
        <Container className={"d-flex justify-content-center align-content-center vh-100 vw-100 mt-5"} fluid>
            <Form onSubmit={handleSubmit}>
                <Container className={"py-2 text-center mb-5"}>
                    <h1 className={"text-center lead fs-2 text-primary"}>Reset your password</h1>
                </Container>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Container className={"d-flex justify-content-center align-content-center"}>
                    <Button variant="info" type="submit">Confirm Password Reset</Button>
                </Container>
                {message && <p className={"text-success"}>{message}</p>}
                {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}
            </Form>
        </Container>
    );
}

export default PasswordResetConfirm;