import React from "react";
import {Container, Col, Row} from "react-bootstrap"
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function DonateScreen(){
    return (
        <>
            <Helmet>
                <script type="text/javascript" defer src="https://donorbox.org/install-popup-button.js"> </script>
                <script type="text/javascript" defer src="https://donorbox.org/install-popup-button.js"> </script>
            </Helmet>
            <MyNavbar />
            <Container className={"mx-0 px-0"} fluid>
                <Container>
                    <h2 className={"text-center  p-4 fs-1"}>Who We Help</h2>
                    <Container className={"d-flex justify-content-center"}>
                        <Row className={"w-100 d-flex"}>
                            <Col  sm={12} lg={6} className={""}>
                                <div className={"w-100"}>
                                    <Link className={"w-100 btn btn-lg btn-outline-info m-1 dbox-donation-button donate-btn"} to={"https://donorbox.org/tis-the-season-of-giving-1"}>Donate Funds</Link>
                                </div>
                            </Col>
                            <Col  sm={12} lg={6} className={""}>
                                <div className={"w-100"}>
                                <Link className={"w-100 btn btn-lg btn-outline-info m-1"} to={"/activity/donate-essentials"}>Donate Essentials</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container className={"d-flex flex-row justify-content-center align-content-center flex-wrap"}>
                        <Col lg={4} md={4} sm={6}
                            className={"m-3"}>
                            <Container className={"p-3"}>
                                <h3 className={"text-center transitioning-background-secondary py-2 rounded-3 text-light border"}>01</h3>
                                <p className={" text-center lead"}>Deliver nutritious home made meals, hygiene essentials, and clothing to the less fortunate</p>
                            </Container>
                        </Col>
                        <Col lg={4} md={4} sm={6}
                            className={"m-3"}>
                            <Container className={"p-3"}>
                                <h3 className={"text-center transitioning-background-secondary py-2 rounded-3 text-light border"}>02</h3>
                                <p className={" text-center lead"}>We offer a volunteering experience that's enjoyable and inclusive for everyone.  </p>
                            </Container>
                        </Col>
                        <Col lg={4} md={4} sm={6}
                            className={"m-3"}>
                            <Container className={"p-3"}>
                                <h3 className={"text-center transitioning-background-secondary py-2 rounded-3 text-light border"}>03</h3>
                                <p className={" text-center lead"}>Provide students with an opportunity to gain valuable experience volunteering.</p>
                            </Container>
                        </Col>
                    </Container>
                </Container>
                <Container className={"transitioning-background-secondary pb-0 mb-0"} fluid>
                    <Container className={"py-3 m-0 d-flex justify-content-center"} fluid>
                        <h2 className={"fw-light text-light"}>
                            The value of money isn't what it can buy, but how many it can help.
                        </h2>
                    </Container>
                </Container>
                <Container>
                    <h1 className={"text-center py-4 "}>
                        It's The Season Of Giving
                    </h1>
                </Container>
                <Container className={"d-flex justify-content-center align-content-center"}>
                    <Row className={"flex-row flex-wrap flex-sm-row-reverse"}>
                        <Col sm={6} className={"p-4"}>
                        </Col>
                        <Col sm={6} className={"p-4 d-flex align-items-center"}>
                            <p className={"lead fs-4 "}
                               style={{"textAlign": "justify"}}>
                                Thousands of people in the greater Montreal area don’t know where their next meal will come from. Rising unemployment levels caused by COVID-19 have forced many more to choose between rent and groceries.
                                <br/><br/>
                                You can help make sure Canadians don’t go to bed hungry tonight. Donate today to feed hungry families, deliver nutritious food to those in need, and support local students!
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Container>
           <Footer />
        </>
    )
}