import React, {useEffect, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import { apiCall } from '../../utils/apiUtils';
import './ContactForm.scss';

export default function ContactForm({ user }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [error, setError] = useState(false);


    useEffect(() => {
        setEmail(user?.email)
    }, [user?.email]);

    useEffect(() => {
        (user?.firstName ? setName(`${user?.firstName} ${user?.lastName}`) : setName(""))
    }, [user?.firstName, user?.lastName]);
    const handleSubmit =  (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            submitForm(e);
        }
    };
    const submitForm = async (e) =>{
        e.preventDefault();
        try {
            const response = await apiCall(`${process.env.REACT_APP_API_URL}/api/contact-form-submission`, "POST", {}, {
                email: email,
                name: name,
                subject: subject,
                content: content
            });
            if (response && response.detail) {
                setServerMessage(response.detail);
                setError(false);
            }
        } catch (error) {
                setServerMessage('An unknown error occurred. Please try again.');
                setError(true);
            console.error("There was an error sending the message", error.message);
        }
    };


    return (
        <Container className="contact-form">
            <Form id={"getInTouchId"}
                  onSubmit={handleSubmit} 
                  className="form">
                <InputField
                    id="email"
                    type="email"
                    defaultValue={email}
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                    id="name"
                    type="text"
                    defaultValue={name}
                    placeholder="Your Full Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <InputField
                    id="subject"
                    type="text"
                    defaultValue={subject}
                    placeholder="Subject"
                    onChange={(e) => setSubject(e.target.value)}
                />

                <TextAreaField
                    id="content"
                    defaultValue={content}
                    placeholder="Your Message"
                    onChange={(e) => setContent(e.target.value)}
                />
                {serverMessage && (
                    <div className={"bg-light rounded-3 mt-3"}>
                        <p className={`m-3 ${!error ? 'text-success' : 'text-danger'}`}>{serverMessage}</p>
                    </div>
                )}

                <div className="form__group">
                    <input type="submit" className="form__btn" value="Send us a message"/>
                </div>
            </Form>
        </Container>
    )
}

function InputField({ id, type, defaultValue, placeholder, onChange }) {
    return (
        <div className="form__group" controlId={id}>
            <label htmlFor={id} className='form__label'>{placeholder}</label>
            <input
                name={id}
                id={id}
                type={type}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
                className="form__input"
            required/>
        </div>
    );
}

function TextAreaField({ id, defaultValue, placeholder, onChange }) {
    return (
        <div className="form__group" controlId={id}>
            <label htmlFor={id} className='form__label'>{placeholder}</label>
            <textarea
                name={id}
                id={id}
                as="textarea"
                defaultValue={defaultValue}
                onChange={onChange}
                className="form__input"
            required/>
        </div>
    );
}
