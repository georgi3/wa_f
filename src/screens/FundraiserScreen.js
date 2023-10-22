import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import fundRaisingImg from "../assets/images/activity/fundRaisers.png"
import {format, parseISO} from "date-fns";
import {handleLink} from "../utils/navigationUtils";

export default function FundraiserScreen() {
    return (
        <>
            <MyNavbar />
            <Container fluid>
                <Container>
                    <h1 className={"lead fs-1 text-center py-3 mt-1"}>Fundraising</h1>
                </Container>
                <Container>
                    <Row className={"d-flex flex-row flex-sm-row-reverse px-0"}>
                        <Col  sm={12} lg={6} className={"py-5"}>
                            <Container className={"d-flex justify-content-center px-0"}>
                                <img height={500} className={"img-fluid shadow-lg"} src={fundRaisingImg} alt="Fundraising Post"/>
                            </Container>
                        </Col>
                        <Col className={"p-3"} sm={12} lg={6}>
                            <h2 className={" fw-light text-lg-start"}><span className={"border-decor"}>Description:</span> </h2>
                            <p className={"lead fs-4 my-3"} style={{textAlign: "justify"}}>
                                Welcome to Welfare Avenue, where we put the FUN in fundraising! We focus on community building, fostering connections, and raising awareness to support our mission. Our events are thoughtfully centered in schools, encouraging student involvement. Check out our past events and sign up for exciting upcoming fundraisers to be part of the impact!
                            </p>
                            <p className={"lead fs-4 my-3"}>Get in touch with us to collaborate!</p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container className={"px-0"} fluid>
                <h2 className="lead fs-2 text-center text-light waves-bg-primary py-2">
                    Our recent fundraisers
                </h2>
                <Container>
                    <FundraisingCard />
                </Container>
            </Container>
            <Footer />
        </>
    )
}

async function fetchFundraisingEvents() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/fundraising`);
    const data = await response.json();
    const currentDate = new Date();

    // Filter out events with empty imgHero and par1 attributes for past events
    const filteredEvents = data.filter((frEvent) => {
        const eventDate = new Date(frEvent.datetime);
        const isFutureEvent = eventDate >= currentDate;
        return !(!isFutureEvent && !frEvent.imgHero && !frEvent.par1);
    });

    // Sort the filtered events by date in ascending order
    filteredEvents.sort((event1, event2) => {
        const date1 = new Date(event1.datetime);
        const date2 = new Date(event2.datetime);
        return date1 - date2;
    });

    // Split events into past and future arrays
    const pastEvents = [];
    const futureEvents = [];

    filteredEvents.forEach((frEvent) => {
        const eventDate = new Date(frEvent.datetime);
        if (eventDate >= currentDate) {
            futureEvents.push(frEvent);
        } else {
            pastEvents.push(frEvent);
        }
    });

    // Limit past events to the 4 most recent
    const limitedPastEvents = pastEvents.slice(-4);

    // Combine limited past events and all future events into a single array
    return [...limitedPastEvents, ...futureEvents];
}



function FundraisingCard() {
    const [frEvents, setFrEvents] = useState([]);

    useEffect(() => {
        (async() => {
            const data = await fetchFundraisingEvents();
            setFrEvents(data);
        })()
    }, []);

    return (
        <Container className={"my-3"}>
            <Row>
                {frEvents.map((frEvent) => (
                    <Col key={frEvent.id} md={6} lg={4} xl={3}>
                        <Link onClick={handleLink} to={`/activity/fundraising/${frEvent.id}`} className="custom-link">
                            <Card className="custom-card">
                                <Card.Img variant="top" src={frEvent.eventPoster} alt={`${frEvent.title} Poster`} />
                                <Card.Body>
                                    <Card.Title>{frEvent.title}</Card.Title>
                                    <Card.Text>{frEvent.datetime ? format(parseISO(frEvent.datetime), 'MMM dd, yyyy') : ''}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))
                }
            </Row>
        </Container>
    );
}
