import React from "react";
import {Container, Col, Row} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import weeklyEvent from "../assets/images/activity/weeklyEvent.png";
import collabs from "../assets/images/activity/collabs.png";
import clothesDonation from "../assets/images/activity/clothesDonation.png";
import activityBackground from "../assets/images/home/slide4.png";
import fundRaisers from "../assets/images/activity/fundRaisers.png";
import {Link} from "react-router-dom";
import {handleLink} from "../utils/navigationUtils";


export default function ActivityScreen(){
    return(
        <>
            <MyNavbar />
            <div className="hero-overlay shadow-lg" style={{ backgroundImage: `url(${activityBackground})`}}>
                <Container>
                    <Row>
                        <Col className={"hero-text"}>
                            <h1 className={"fs-1 lead mt-5"}>Our Activities</h1>
                            <p className={"fs-4 lead"}></p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid>
                <Container>
                    <Row className={"d-flex justify-content-between py-4"}>
                        <Col lg={6}>
                            <p className="pt-3 px-4 lead text-center">
                                Relieving poverty by connecting disadvantaged individuals with necessary goods and services.
                            </p>
                        </Col>
                        <Col lg={6}>
                            <p className="pt-3 px-4 lead text-center">
                                Facilitating partnerships and collaborations with other organizations, businesses, and corporations that align with our mission.
                            </p>
                        </Col>
                        <Col lg={6}>
                            <p className="pt-3 px-4 lead text-center">
                                Addressing food insecurity by working collaboratively with volunteers to operate a food distribution service that provides healthy meals to people experiencing poverty and homelessness
                            </p>
                        </Col>
                        <Col lg={6}>
                            <p className="pt-3 px-4 lead text-center">
                                Mobilizing youth/students & volunteers in the community to address the social issue of homelessness.
                            </p>
                        </Col>
                        <Col lg={6}>
                            <p className="pt-3 px-4 lead text-center">
                                Addressing isolation by creating a sense of community through our weekly free feeding program/events, implementing activities such as sports, community pop-ups, and game events
                            </p>
                        </Col>
                        <Col lg={6}>
                            <p className="pt-3 px-4 lead text-center">
                                Increasing accessibility to valuable life resources for marginalized individuals by partnering with local organizations and community workers to provide access to mental health supports, employment opportunities, and subsidized housing.
                            </p>
                        </Col>
                        <Col lg={6}>
                            <p className="pt-3 px-4 lead text-center">
                                To work together with other NPO/charity organizations on issues which affect disadvantaged populations.
                            </p>
                        </Col>
                        <Col lg={6}>
                            <p className="pt-3 px-4 lead text-center">
                                To collaborate with those who share our concern for social issues; be a voice for the less fortunate.
                            </p>
                        </Col>
                    </Row>
                    <Container className={"my-4 py-2 pb-3"}>
                        <Row>
                            <Col lg={3} md={6} sm={12} className={""}>
                                <h1 className={"lead text-center fs-4"}>
                                    <Link onClick={handleLink} to={"weekly-volunteering"} className={"btn btn-outline-info"}>Weekly Volunteering</Link>
                                </h1>
                                <div className={"activity-item shadow-lg my-5"}>
                                    <img src={weeklyEvent} className={"activity-img"} alt="Weekly Events Poster"/>
                                    <h4 className={"activity-item-title text-light lead fs-4 text-center"}>Weekly Events</h4>
                                    <p className={"activity-item-title mt-5 text-light text-center lead"}>Join our dedicated team of volunteers! </p>
                                    <Link onClick={handleLink} to={"/activity/weekly-volunteering"} className={"btn btn-outline-light"}>
                                        See More
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12} className={""}>
                                <h1 className={"lead text-center fs-4"}>
                                    <Link onClick={handleLink} to={"/activity/fundraising"} className={"btn btn-outline-info"}>Fundraisers</Link>
                                </h1>
                                <div className={"activity-item shadow-lg my-5"}>
                                    <img src={fundRaisers} className={"activity-img"} alt="Fundraisers"/>
                                    <h4 className={"activity-item-title text-light lead fs-4 text-center"}>Fundraisers</h4>
                                    <p className={"activity-item-title mt-5 text-light text-center lead"}>Support our charity's fundraisers and help make a difference in the lives of those in need.</p>
                                    <Link onClick={handleLink} to={"/activity/fundraising"} className={"btn btn-outline-light"}>
                                        See More
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12} className={""}>
                                <h1 className={"lead text-center fs-4"}>
                                    <Link onClick={handleLink} to={"/activity/club-volunteering"} className={"btn btn-outline-info"}>Club Volunteering</Link>
                                </h1>
                                <div className={"activity-item shadow-lg my-5"}>
                                    <img src={collabs} className={"activity-img"} alt="Corporate Volunteer"/>
                                    <h4 className={"activity-item-title text-light lead fs-4 text-center"}>Club Volunteering</h4>
                                    <p className={"activity-item-title mt-5 text-light text-center lead"}>Have a group 10 or more wanting to volunteer all together? Look no further sign up here!</p>
                                    <Link onClick={handleLink} to={"club-volunteering"} className={"btn btn-outline-light"}>
                                        See More
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12} className={""}>
                                <h1 className={"lead text-center fs-4"}>
                                    <Link onClick={handleLink} to={"donate-essentials"} className={"btn btn-outline-info"}>Donate Essentials</Link>
                                </h1>
                                <div className={"activity-item shadow-lg my-5"}>
                                    <img src={clothesDonation} className={"activity-img"} alt="Essential Donations"/>
                                    <h4 className={"activity-item-title text-light lead fs-4 text-center"}>Donate the Essentials</h4>
                                    <p className={"activity-item-title mt-5 text-light text-center lead"}>Helping the community by giving unused clothes, food and other items!</p>
                                    <Link onClick={handleLink} to={"donate-essentials"} className={"btn btn-outline-light"}>
                                        See More
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    {/*<Container className={"d-flex flex-row flex-wrap"}>*/}
                    {/*    <Col className={"p-lg-4"} sm={12} md={6}>*/}
                    {/*        <p className={"lead fs-4 px-3"} style={{textAlign: "justify"}}>{lorem}</p>*/}
                    {/*    </Col>*/}
                    {/*    <Col className={"p-lg-4"} sm={12} md={6}>*/}
                    {/*        <p className={"lead fs-4 px-3"} style={{textAlign: "justify"}}>{lorem}</p>*/}
                    {/*    </Col>*/}
                    {/*</Container>*/}
                    {/*<Container fluid>*/}
                    {/*    <EventTabs events={events} />*/}
                    {/*</Container>*/}
                </Container>
            </Container>
            <Footer />
        </>
    )
}