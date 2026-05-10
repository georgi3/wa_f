import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import React from "react";
import "../screens/UserAuth/AuthScreens.scss";

export default function NotAuthenticatedPrompt({ prompt, state }) {
    return (
        <section className="auth-screen auth-screen--compact">
            <Container className="auth-access-card text-center">
                <div className="auth-access-eyebrow">Members only</div>
                <h2 className="auth-access-title">Join Us!</h2>
                <p className="auth-access-copy">
                { prompt }
                </p>
                <div className="auth-access-actions">
                    <Link to={"/signup"} state={state} className={"btn auth-primary-btn"}>
                        Sign Up Now
                    </Link>
                    <Link to={"/signin"} state={state} className={"btn auth-secondary-btn"}>
                        Already have an account?
                    </Link>
                </div>
                <p className="auth-access-support">Create an account or sign in to continue where you left off.</p>
            </Container>
        </section>
    );
}
