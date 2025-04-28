import React, { useState, useEffect } from 'react';
import {Modal, Form, Button, Alert, Container} from 'react-bootstrap';
import {useAuth} from "../context/AuthContext";
import {useLocation} from "react-router-dom";
import NotAuthenticatedPrompt from "./NotAuthenticatedPromt";
import {apiCall} from "../utils/apiUtils";
import {isWithinServiceArea, getServiceAreaMessage} from "../utils/postalCodeUtils";
import { Helmet } from 'react-helmet';

function VolunteerNotice(){
    return (
        <Container className={"bg-primary-subtle p-5"}>
            <Helmet>
                <script>{`gtag('event', 'conversion', {'send_to': 'AW-11436485356/QySBCK6j6IoZEOzVq80q'});`}</script>
            </Helmet>
            <h2 className={"text-secondary fw-bold text-center"}>Thank You for Applying:</h2>
            <Container className={"d-flex"}>
                <p className={"lead text-dark"} >
                    Thank you for your interest in volunteering for our event! Your willingness to help is greatly appreciated. Once your application is approved, you'll receive a confirmation email from us. We look forward to having you on board!
                </p>
            </Container>
            <h2 className={"text-secondary text-muted fs-4 fw-light text-center"}>Cancellation Policy:</h2>
            <Container className={"d-flex"}>
                <p className={"text-dark text-muted fs-6"}>
                   If you need to cancel your volunteering commitment, please provide us with at least a three-day notice. This helps us ensure the smooth planning and execution of the event. Your understanding and cooperation are highly appreciated
                </p>
            </Container>
        </Container>
    )
}

function VolunteerApplicationModal({ isOpen, onClose, positionNamePlural, eventId }) {
    const { user, updateUser } = useAuth();
    const [fullName, setFullName] = useState(
        (user?.firstName) ? (user.firstName + " " + user.lastName) : ''
    );
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [organization, setOrganization] = useState(user?.organization || '');
    const [address, setAddress] = useState(user?.address || '');
    const [foodDroppedOff, setFoodDroppedOff] = useState(false);
    const [carType, setCarType] = useState(user?.carType || '');
    const [zipCode, setZipCode] = useState(
        (user?.zipCode) ? (`${user?.zipCode}`) : '');
    const [isApplicationSubmitted, setApplicationSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [zipCodeError, setZipCodeError] = useState('');
    const [zipCodeServiceError, setZipCodeServiceError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorCarType, setCarTypeError] = useState('');
    const location = useLocation();
    const positionName = positionNamePlural?.slice(0, -1);
    useEffect(() => {
        setPhone(user?.phone || '');
        setOrganization(user?.organization || '');
        setAddress(user?.address || '');
        setCarType(user?.carType || '');
        setZipCode(user?.zipCode ? `${user?.zipCode}` : '');
    }, [user]);
    useEffect(() => {
        if(positionName === 'Cook' && !address) {
            // If position is Cooks, address becomes mandatory
            setAddress(''); // Resetting
        }
    }, [positionName]);
    useEffect(() => {
        if(positionName === 'Cook' && !zipCode) {
            setZipCode(''); // Resetting
        }
    }, [positionName]);

    const validatePhone = () => {
        const phoneRegex = /^[0-9-. ]{1,12}$/;
        if (!phone.match(phoneRegex)) {
            setPhoneError('Invalid phone format. Max length is 12 and only digits or standard separators allowed.');
            return false;
        }
        setPhoneError('');
        return true;
    };
    const validateCarType = () => {
        if (positionName === 'Driver' && (carType === "")) {
            setCarTypeError('Please specify your car type!');
            return false;
        }
        setCarTypeError('');
        return true;
    };

    const validateAddress = () => {
        const addressRegex =  /^\d+\s[A-Za-z\s,-]+[\s-][A-Za-z\s,-]+/;

        if (positionName === 'Cook' && !addressRegex.test(address)) {
            setAddressError('Invalid address format. Expected format: "123 St Springfield"');
            return false;
        }
        setAddressError('');
        return true;
    };

    const validateZipCode = (value = zipCode) => {
        const currentZipCode = value || zipCode;
        const zipCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        if (positionName === 'Cook' && !RegExp(zipCodeRegex).exec(currentZipCode)) {
            setZipCodeError('Invalid postal code. Format should be XXX XXX.');
            return false;
        }
        setZipCodeError('');
        
        // Check if postal code is within service area
        if (positionName === 'Cook' && RegExp(zipCodeRegex).exec(currentZipCode) && !isWithinServiceArea(currentZipCode)) {
            setZipCodeServiceError(`This postal code appears to be outside our service area. ${getServiceAreaMessage()}`);
            return false;
        }
        setZipCodeServiceError('');
        
        return true;
    };

    const handleSubmit = async () => {
        if (!validatePhone() || !validateAddress() || !validateZipCode() || !validateCarType()) {
            return;
        }
        try {
            await apiCall(`${process.env.REACT_APP_API_URL}/api/users/apply`, 'POST', {
                'Authorization': `Bearer  ${user?.token}`
            }, {
                event_id: eventId,
                user_id: user.id,
                phone: phone,
                organization: organization,
                address: address,
                car_type: carType,
                zip_code: zipCode,
                vol_position: positionName,
                food_drop_off: foodDroppedOff
            });
            setApplicationSubmitted(true);
            updateUser({
                phone: phone,
                organization: organization,
                address: address,
                carType: carType,
                zipCode: zipCode
            });

            window.gtag('event', 'volunteer-signup' , { 'event_category': 'engagement', 'event_label': 'volunteer-signup', 'value': '1' });
        } catch (error) {
            console.error(error.message || error);
            setErrorMessage(error.message || 'Unknown error');
        }
    };
    if (isApplicationSubmitted) {
        return (
            <Modal show={isOpen} onHide={onClose} centered>
                <VolunteerNotice />
            </Modal>
        );
    }
    if (!user) {
        return (
            <Modal show={isOpen} onHide={onClose} centered>
                <NotAuthenticatedPrompt state={{from: `${location.pathname}`}} prompt={"To volunteer for this event, please sign up first. We promise it's a quick process!"}  />
            </Modal>
        );
    }

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Volunteer Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" value={fullName} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Volunteer Responsibility</Form.Label>
                        <Form.Control type="text" value={positionName} readOnly />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="tel"
                            value={phone}
                            onChange={e => {
                                setPhone(e.target.value);
                                validatePhone();
                            }}
                            isInvalid={!!phoneError}
                            required/>
                        <Form.Control.Feedback type="invalid">{phoneError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Organization</Form.Label>
                        <Form.Control
                            type="text"
                            value={organization}
                            placeholder={"Optional"}
                            onChange={e => setOrganization(e.target.value)}
                        />
                    </Form.Group>
                    {positionName === "Driver" ? (
                        <Form.Group>
                            <Form.Label>Car Type</Form.Label>
                            <Form.Control
                                type="text"
                                value={carType}
                                onChange={e => {
                                    setCarType(e.target.value);
                                    validateCarType();
                                }}
                                isInvalid={!!errorCarType}
                                required/>
                            <Form.Control.Feedback type="invalid">{errorCarType}</Form.Control.Feedback>
                        </Form.Group>
                    ) : null
                    }
                    {positionName === "Cook" ? (
                        <>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={e => {
                                    setAddress(e.target.value);
                                    validateAddress();
                                }}
                                isInvalid={!!addressError}
                                required/>
                            <Form.Control.Feedback type="invalid">{addressError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={zipCode}
                                onChange={e => {
                                    const newValue = e.target.value;
                                    setZipCode(newValue);
                                    validateZipCode(newValue);
                                }}
                                isInvalid={!!zipCodeError || !!zipCodeServiceError}
                                required/>
                            <Form.Control.Feedback type="invalid">
                                {zipCodeError || zipCodeServiceError}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                {!zipCodeError && !zipCodeServiceError && "We serve areas close to Berri-UQAM station."}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mb-0">Will you drop off the food? </Form.Label>
                            <Form.Check
                                type="checkbox"
                                className={'p-2'}
                                custom
                                style={{ display: 'inline-block', transform: 'scale(1.2)' }}
                                checked={foodDroppedOff}
                                onChange={e => setFoodDroppedOff(e.target.checked)}
                                id="foodDroppedOffCheckbox"
                            />
                        </Form.Group>
                        </>
                        ) : null
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Apply
                </Button>
                {errorMessage &&
                    <div className="mt-3 w-100">
                        <Alert variant="danger">
                            {errorMessage}
                        </Alert>
                    </div>}
            </Modal.Footer>

        </Modal>
    );
}

export default VolunteerApplicationModal;
