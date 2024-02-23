import React, { useState, useEffect } from 'react';
import MyNavbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import { lineSpinner } from 'ldrs';

lineSpinner.register()


export default function ConfirmParticipationScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        if (success) {
            const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            if (counter === 0) {
                navigate('/');
            }
            return () => clearInterval(timer);
        }
    }, [success, counter, navigate]);

    const getTokenFromURL = () => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get('token');
    };

    const handleConfirmClick = async () => {
        setIsLoading(true);
        const token = getTokenFromURL();
        if (token) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/confirm-assignment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });
                const data = await response.json();
                setResponseMessage(data.message);
                if (response.ok) {
                    setSuccess(true);
                } else {
                    setSuccess(false);
                }
            } catch (error) {
                console.error('Error confirming participation:', error);
                setSuccess(false);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    return (
        <>
            <MyNavbar />
            <Container className="my-5 p-5 bg-light shadow-lg rounded">
                <h2 className="text-center fs-2 lead mb-4">Confirm Your Participation</h2>
                <div className="d-flex justify-content-center">
                    {isLoading ? (
                        <l-line-spinner
                            size="40"
                            stroke="3"
                            speed="1"
                            color="black"
                        ></l-line-spinner>
                    ):(
                        <Button variant="outline-primary" onClick={handleConfirmClick}>Press to Confirm</Button>
                    )
                    }
                </div>
                {success !== null && (
                    <p className={`mt-3 text-center ${success ? "text-success" : "text-danger"}`}>
                        {responseMessage}
                    </p>
                )}
                {success && (
                    <p className="text-center mt-3">
                        You will be redirected to the home page in {counter} seconds.
                    </p>
                )}
            </Container>
        </>
    );
}
