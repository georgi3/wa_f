import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import React from "react";

export default function NotAuthenticatedPrompt({ prompt, state }) {
    return (
        <Container className={"bg-info p-5 text-center rounded"}>
            <h2 className={"text-white mb-4"}>Join Us!</h2>
            <p className={"lead text-light mb-4"}>
                { prompt }
            </p>
            <Link to={"/signup"} state={state} className={"btn btn-light fw-bold my-2"}>
                Sign Up Now
            </Link>
            <br/>
            <Link to={"/signin"} state={state} className={"btn btn-light fw-light my-2"}>
                Already have an account?
            </Link>
        </Container>
    );
}
