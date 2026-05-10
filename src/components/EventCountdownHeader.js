import React from "react";
import { Container } from "react-bootstrap";
import CountdownTimer from "./CountdownTimer";

export default function EventCountdownHeader({ title, dateTimeDifference }) {
    return (
        <Container className={"px-0 px-lg-5"}>
            <h1 className={"text-center py-3 mt-1 lead fs-1"}>{title}</h1>
            <p className={"lead fs-3 text-center mt-5"}>Starts In:</p>
            <div className={"text-center fs-4 lead d-flex align-content px-0"}>
                <CountdownTimer targetDate={dateTimeDifference} />
            </div>
        </Container>
    );
}
