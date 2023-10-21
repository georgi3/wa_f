import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import CountdownTimer from "./CountdownTimer";
import {format, parseISO} from "date-fns";
import {Link} from "react-router-dom";

export default function FundraisingFutureEvent({ frEvent, dateTimeDifference }){
    return (
        <>
            <Container className={"px-0 px-lg-5"}>
                <h1 className={" text-center py-3 mt-1 lead fs-1"}>{frEvent?.title} </h1>
                <p className={"lead fs-3 text-center mt-5"}>Starts In:</p>
                <div className={"text-center fs-4 lead d-flex align-content px-0"}>
                    <CountdownTimer targetDate={dateTimeDifference} />
                </div>
            </Container>
            <Container className={"py-3 my-2"}>
                <Row className={"d-flex flex-row flex-sm-row-reverse px-0"}>
                    <Col  sm={12} lg={6} className={""}>
                        <Container className={"d-flex justify-content-center px-0"} fluid>
                            <img height={500} className={"img-fluid shadow-lg"} src={frEvent?.eventPoster} alt="frEvent Image"/>
                        </Container>
                    </Col>
                    <Col className={""} sm={12} lg={6}>
                        <h2 className={"fw-light text-start"}><span className={"border-decor"}>Description:</span> </h2>
                        <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>Initial Text {frEvent?.description}</p>
                        <ul className={"lead fs-4  px-0"}>
                            <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Date:</span> <span>{frEvent?.datetime ? format(parseISO(frEvent?.datetime), 'MMM dd, yyyy') : ''}</span></li>
                            <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Time:</span> <span>{frEvent?.datetime ? format(parseISO(frEvent?.datetime), 'HH:mm') : ''}</span></li>
                            <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Location:</span> <span>{frEvent?.location}</span></li>
                        </ul>
                        {
                            frEvent?.ticketLink
                            ?
                                <>
                                    <Container className={"d-flex justify-content-center p-4"}>
                                        <Link className={"w-50 btn btn-lg btn-outline-info"} to={`${frEvent?.ticketLink}`}>Tickets</Link>
                                    </Container>
                                </>
                            :
                                <Container className={"d-flex justify-content-center p-4"}>
                                    <p className={"fs-3 lead"}>Tickets are not for sale yet</p>
                                </Container>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}