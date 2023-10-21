import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import {Col, Container} from "react-bootstrap";

const ExpiredNotice = () => {
    return (
        <div className="text-center expired-notice">
            <span>Expired!!!</span>
            <p>Please select a future date and time.</p>
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <Container className={"px-0"} fluid>
            <h2 className={"lead fs-4 p-1 py-2 px-0"}>
                <Container className={"d-flex justify-content-between px-0"} fluid>
                    <Col className={"border shadow-sm text-info"}>
                        <p className={"py-1 my-1"}>{days}</p>
                        <p className={"py-1 my-1"}>Days</p>
                    </Col>
                    <Col className={"border shadow-sm text-info"}>
                        <p className={"py-1 my-1"}>{hours}</p>
                        <p className={"py-1 my-1"}>Hours</p>
                    </Col>
                    <Col className={"border shadow-sm text-info"}>
                        <p className={"py-1 my-1"}>{minutes}</p>
                        <p className={"py-1 my-1"}>Minutes</p>
                    </Col>
                    <Col className={"border shadow-sm text-info"}>
                        <p className={"py-1 my-1"}>{seconds}</p>
                        <p className={"py-1 my-1"}>Seconds</p>
                    </Col>
                </Container>
            </h2>
        </Container>
    )
};

const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;
