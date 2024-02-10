import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import CountdownTimer from "./CountdownTimer";
import {format, parseISO} from "date-fns";
import VolunteerPositionLink from "./VolunteerPositionLink";

export default function VolunteeringFutureEvent({ vEvent, dateTimeDifference, closeApplication }){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Container className={"px-0 px-lg-5"}>
                <h1 className={" text-center py-3 mt-1 lead fs-1"}>{vEvent?.title} </h1>
                <p className={"lead fs-3 text-center mt-5"}>Starts In:</p>
                <div className={"text-center fs-4 lead d-flex align-content px-0"}>
                    <CountdownTimer targetDate={dateTimeDifference} />
                </div>
            </Container>
            <Container fluid>
                <Container>
                    <Row className={"d-flex flex-row flex-sm-row-reverse"}>
                        <Col  sm={12} lg={6} className={"py-5"}>
                            <Container className={"d-flex justify-content-center"}>
                                <img height={500} className={"img-fluid shadow-lg"} src={vEvent?.event_poster} alt={`${vEvent?.title} Poster`}/>
                            </Container>
                        </Col>
                        <Col className={"p-3"} sm={12} lg={6}>
                            <h2 className={" fw-light text-lg-start"}><span className={"border-decor"}>Description:</span> </h2>
                            <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>{vEvent?.body}</p>
                            <ul className={"lead fs-4  px-0"}>
                                <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Date:</span> <span>{vEvent.datetime ? format(parseISO(vEvent.datetime), 'dd/MM/yyyy HH:mm') : ''}</span></li>
                                <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>End Time:</span> <span>{vEvent.end_time ? format(parseISO(`1970-01-01T${vEvent?.end_time}-05:00`).getTime(), "HH:mm") : ''}</span></li>
                                <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Location:</span> <span>{vEvent?.location}</span></li>
                                {closeApplication === true ? (
                                    <div className={"text-center py-3"}>Application Process is Closed</div>
                                ) : (
                                    <>
                                        <li className={"list-unstyled"}>
                                            <VolunteerPositionLink
                                                positionName="Drivers"
                                                applicationCount={vEvent?.driver_count}
                                                positionsLeft={vEvent?.drivers_left}
                                                linkPath="/apply"
                                                eventId={vEvent?.id}/>
                                        </li>
                                        <li className={"list-unstyled"}>
                                            <VolunteerPositionLink
                                                positionName="Cooks"
                                                applicationCount={vEvent?.cook_count}
                                                positionsLeft={vEvent?.cooks_left}
                                                linkPath="/apply"
                                                eventId={vEvent?.id}/>
                                        </li>
                                        <li className={"list-unstyled"}>
                                            <VolunteerPositionLink
                                                positionName="Servers"
                                                applicationCount={vEvent?.server_count}
                                                positionsLeft={vEvent?.servers_left}
                                                linkPath="/apply"
                                                eventId={vEvent?.id}/>
                                        </li>
                                        {vEvent?.dishwashers_left !== 0 ?
                                            <li className={"list-unstyled"}>
                                                <VolunteerPositionLink
                                                    positionName="Dishwashers"
                                                    applicationCount={vEvent?.dishwasher_count}
                                                    positionsLeft={vEvent?.dishwashers_left}
                                                    eventId={vEvent?.id}/>
                                            </li>
                                            : null
                                        }
                                        {vEvent?.photographers_left !== 0 || vEvent?.photographer_count >= 3 ?
                                            <li className={"list-unstyled"}>
                                                <VolunteerPositionLink
                                                    positionName="Photographers"
                                                    applicationCount={vEvent?.photographer_count}
                                                    positionsLeft={vEvent?.photographers_left}
                                                    eventId={vEvent?.id}/>
                                            </li>
                                            : null
                                        }
                                    </>
                                )}

                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}