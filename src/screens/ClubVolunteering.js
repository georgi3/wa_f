import React from "react";
import {Container, Col, Row, Carousel} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import {HashLink} from "react-router-hash-link";
import clubImg1 from "../assets/images/activity/club_volunteering/1.JPG";
import clubVid from "../assets/images/activity/club_volunteering/2.mp4";

export default function ClubVolunteering() {
    return (
        <>
            <MyNavbar />
            <Container fluid>
                <Container>
                    <h1 className={" text-center py-3 mt-1"}>Club Volunteering </h1>
                </Container>
                <Container>
                    <Row className={"d-flex flex-row flex-sm-row-reverse"}>
                        <Col  sm={12} lg={6} className={"py-5 px-0"}>
                            <Carousel>
                                <Carousel.Item key={1}>
                                    <Container className={"d-flex justify-content-center px-0 py-2"}>
                                        <img className={"img-fluid"} src={clubImg1} alt="RBC Volunteering"/>
                                    </Container>
                                </Carousel.Item>
                                <Carousel.Item key={2}>
                                    <Container className={"d-flex justify-content-center px-0 py-2"}>
                                        <video controls preload loop className={"img-fluid"}>
                                            <source src={clubVid} type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                    </Container>
                                </Carousel.Item>
                            </Carousel>
                            <Container>
                                <p className={"text-muted text-center"}>RBC Team volunteering with Welfare Avenue</p>
                            </Container>
                        </Col>
                        <Col className={"p-3"} sm={12} lg={6}>
                            <h2 className={" fw-light text-lg-start"}><span className={"border-decor"}>Description:</span> </h2>
                            <p className={"lead fs-4 my-3"} style={{"textAlign": "justify"}}>

                                Calling all clubs and organizations! Join forces with our dedicated volunteer team for a meaningful corporate volunteering experience. Every Sunday from 10:30 to 14:00, our team comes together to make a difference in the lives of the homeless community. We take pride in our track record, having successfully volunteered 24 out of 26 times in the past year. With a focus on cooking delicious homemade meals and distributing them to those in need, your club/organization can directly impact the lives of the homeless.
                                Get involved today by reaching out to us through the <HashLink to={"#getInTouchId"} className={"text-info link-info "}>Get In Touch</HashLink> form below or by contacting us directly.
                                <br/><br/>Please allow up to a week to respond and schedule a call to organize the event with your group.
                            </p>
                            <Container className={"px-0 py-3"} fluid>
                                <h2 className={"fs-4 fw-light"}>
                                    <span className={"border-decor"}>To qualify for such event:</span>
                                </h2>
                                <ol className={"lead fs-4 "} style={{"textAlign": "justify"}}>
                                    <li className={"py-2"}>Must have at least 10-15 volunteers willing to help (For a good event we recommend 1-2 drivers, 4-8 cooks, 5-10 servers. IT IS possible to have one volunteer do 2 or 3 different positions)</li>
                                    <li className={"py-2"}>Book your the event at least 4 weeks in advance</li>
                                    <li className={"py-2"}>Your group is available either Saturday or Sunday (exceptions may be accepted depending on our staff)</li>
                                </ol>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    )
}