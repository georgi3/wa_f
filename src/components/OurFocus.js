import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {CountUpOnScroll} from "./CountUpOnScroll"

export function  OurFocus() {
    return(
        <Container>
            <Row className={"d-flex justify-content-between"}>
                <Col lg={6}>
                    <h2 className="text-center py-3 lead fs-2">Food Distribution</h2>
                    <p className="py-3 px-4 lead " style={{"textAlign": "justify"}}>
                        Addressing food insecurity by working collaboratively with volunteers to operate a food distribution service that provides healthy meals to people experiencing poverty and homelessness
                    </p>
                </Col>
                <Col lg={6}>
                    <h2 className="text-center py-3 lead fs-2">Essential Supply</h2>
                    <p className="py-3 px-4 lead " style={{"textAlign": "justify"}}>
                        Relieving poverty by providing clothing, essential products, and other basic amenities to individuals and families of low income and those experiencing homelessness.
                    </p>
                </Col>
                <Col lg={6}>
                    <h2 className="text-center py-3 lead fs-2">Combating Isolation</h2>
                    <p className="py-3 px-4 lead " style={{"textAlign": "justify"}}>
                        Addressing isolation by implementing activities such as sports, community pop-ups, and game events for individuals experiencing  social exclusion.
                    </p>
                </Col>
                <Col lg={6}>
                    <h2 className="text-center py-3 lead fs-2">Expanding Access to Critical Resources</h2>
                    <p className="py-3 px-4 lead " style={{"textAlign": "justify"}}>
                        Increasing accessibility to valuable resources for marginalized individuals by partnering with local organizations and community workers to provide access to mental health supports, employment opportunities, and subsidized housing.
                    </p>
                </Col>
            </Row>
            <Container className="py-3 m-3 px-1 mx-0 d-flex align-content-center justify-content-center flex-wrap">
                <Row sm={12} className="py-3 w-100">
                    <Col md={4} sm={12} className={"py-1 d-flex align-content-center justify-content-center"}>
                        <h3 className=" lead fs-3">
                            Meals Served:&nbsp;
                            <span className="">
                                <CountUpOnScroll end={10000} start={5000} />
                            </span>
                        </h3>
                    </Col>
                    <Col md={4} sm={12} className={"py-1 d-flex align-content-center justify-content-center"}>
                        <h3 className=" lead fs-3">
                            Money Raised:&nbsp;
                            <span className="">
                                <CountUpOnScroll end={40000} prefix="$"/>
                            </span>
                        </h3>
                    </Col>
                    <Col md={4} sm={12} className={"py-1 d-flex align-content-center justify-content-center"}>
                        <h3 className=" lead fs-3">
                            Events Organized:&nbsp;
                            <span className="">
                                <CountUpOnScroll end={180} />
                            </span>
                        </h3>
                    </Col>
                </Row>
                <Row sm={12} className="py-3 w-100">
                    <Col md={4} sm={12} className={"py-1 d-flex align-content-center justify-content-center"}>
                        <h3 className=" lead fs-3">
                            Fundraising Events :&nbsp;
                            <span className="">
                                <CountUpOnScroll end={25}/>
                            </span>
                        </h3>
                    </Col>
                    <Col md={4} sm={12} className={"py-1 d-flex align-content-center justify-content-center"}>
                        <h3 className=" lead fs-3">
                            Total Volunteers:&nbsp;
                            <span className="">
                                <CountUpOnScroll end={500} />
                            </span>
                        </h3>
                    </Col>
                    <Col md={4} sm={12} className={"py-1 d-flex align-content-center justify-content-center"}>
                        <h3 className=" lead fs-3">
                            Collaborations Held:&nbsp;
                            <span className="">
                                <CountUpOnScroll end={23} />
                            </span>
                        </h3>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}