import React from "react";
import {Container, Col, Row, Tabs, Tab, Accordion} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import {Link} from "react-router-dom";
import weeklyVolunteeringImg from "../assets/images/activity/weeklyEvent.png"
import Footer from "../components/Footer";
import volunteerServer from "../assets/images/volunteering/server.png";
import volunteerDriver from "../assets/images/volunteering/driver.webp";
import volunteerCook from "../assets/images/volunteering/cook.webp";
import DoubleColumn from "../components/DoubleColumn";


const handleLink = () => {
        window.scrollTo(0, 0);
};

export default function WeeklyVolunteering(){

    return(
        <>
            <MyNavbar />
            <Container fluid>
                <Container>
                    <h1 className={" text-center py-3 mt-1"}>Weekly Volunteering </h1>
                </Container>
                <Container className={"px-0"}>
                    <Row className={"d-flex flex-row flex-lg-row-reverse px-0"}>
                        <Col  sm={12} lg={6} className={"py-5 px-0"}>
                            <div className={"d-flex justify-content-center"}>
                                <img height={500} className={"img-fluid shadow-lg"} src={weeklyVolunteeringImg} alt="Weekly Volunteering Poster"/>
                            </div>
                        </Col>
                        <Col className={"p-3"} sm={12} lg={6}>
                            <h2 className={" fw-light text-lg-start"}><span className={"border-decor"}>Description:</span> </h2>
                            <p className={"lead fs-4 my-3"} style={{"textAlign": "justify"}}>Join our dedicated team of volunteers and make a real difference in the lives of the homeless community. Every Sunday from 10:30 to 14:00, our team comes together to volunteer their time and skills. Over the past year, we have successfully volunteered 24 out of 26 times, demonstrating our commitment and reliability. As part of our mission, we prepare delicious homemade meals and distribute them to those in need. By joining our team, you'll have the opportunity to contribute to this meaningful cause and create a positive impact in our community. Together, let's make a lasting change and bring hope to those who need it most.</p>
                            <Container className={"d-flex justify-content-center my-4 py-4"}>
                                <Link onClick={handleLink} to={"/activity/volunteer"} className={"btn btn-outline-info"}>Volunteer with us today!</Link>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <p className={"text-center lead fs-2 px-0 py-3 my-5"}>Read more about volunteer positions</p>
                    <VolunteeringPositions />
                </Container>
            </Container>
            <Footer />
        </>
    )
}

function VolunteeringPositions() {
    return(
        <Tabs
            defaultActiveKey="driverVolunteer"
            id="eventTabs"
            className="mb-3 d-flex justify-content-between"
            style={{backgroundColor: 'none'}}
            justify>
            <Tab eventKey="driverVolunteer" title="Driver Volunteer" className={""} style={{"--bs-nav-tabs-link-active-bg": 'none'}}>
                <Container className={"px-0 px-lg-3"} fluid>
                    <Container>
                        <h1 className={" text-center py-3 mt-1"}>Volunteer as a driver</h1>
                    </Container>
                    <Container className={"px-0"} fluid>
                        <Row className={"d-flex flex-row"}>
                            <Col  sm={12} lg={6} className={"py-5 px-0"}>
                                <Container className={"d-flex justify-content-center"}>
                                    <img height={500} className={"img-fluid shadow-lg"} src={volunteerDriver} alt="Driver Image"/>
                                </Container>
                            </Col>
                            <Col className={"p-3"} sm={12} lg={6} fluid>
                                <h2 className={"fw-light text-lg-end"}><span className={"border-decor"}>Service Description:</span> </h2>
                                <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>
                                    This volunteering position requires your ability to drive, therefore a class 5 drivers licence is mandatory. Also, you we'll need you to bring your own car to transport everything to the unhoused and server volunteers. We'll give you an itinerary to follow, all the equipment needed, a support line for quick help as well as pay for the gas bill at the end of the day.
                                </p>
                                <h2 className={"fw-light text-lg-end"}><span className={"border-decor"}>Volunteer Responsibilities:</span> </h2>
                                <ol className={"lead fs-4 "} style={{"textAlign": "justify"}}>
                                    <li className={"py-2"}>
                                        An itinerary well be given to you 2 to 3 days in advance. It's important you read through it once or twice to see what you route looks like and the number you can call for help.
                                    </li>
                                    <li className={"py-2"}>
                                        Your volunteering activities usually start around 9:30 - 10:00am at our storage unit to pick up the essential serving items.
                                    </li>
                                    <li className={"py-2"}>
                                        From there you'll likely go to 3-5 different cook locations, sometimes including restaurants around Montreal to pick up the food.
                                    </li>
                                    <li className={"py-2"}>
                                        You'll be paired with an experienced volunteer leader to help guide you from one cook's place to another.
                                    </li>
                                    <li className={"py-2"}>
                                        Finally you'll arrive at the serving location given on the itinerary. This is where you'll meet 5 to 8 server volunteers to help set up and serve everything you've brought them.
                                    </li>
                                </ol>
                                <Container className={"d-flex justify-content-center my-5"}>
                                    <Link onClick={handleLink} to={"/activity/volunteer/#startVolunteeringId"} className={"btn btn-outline-info"}>
                                        Sign up as a volunteer driver right now!
                                    </Link>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Tab>
            <Tab eventKey="cookVolunteer" title="Cook Volunteer" className={""}>
                <Container className={"px-0 px-lg-3"} fluid>
                    <Container>
                        <h1 className={" text-center py-3 mt-1"}>Volunteer as a Cook</h1>
                    </Container>
                    <Container className={"px-0"} fluid>
                        <Row className={"d-flex flex-row"}>
                            <Col  sm={12} lg={6} className={"py-5 px-0"}>
                                <Container className={"d-flex justify-content-center"}>
                                    <img height={500} className={"img-fluid shadow-lg"} src={volunteerCook} alt="Cook Image"/>
                                </Container>
                            </Col>
                            <Col className={"p-3 pt-5"} sm={12} lg={6} fluid>
                                <h2 className={"fw-light text-lg-end"}><span className={"border-decor"}>Service Description:</span></h2>
                                <p className={"lead fs-4 pt-3 "} style={{"textAlign": "justify"}}>
                                    If you'd like to volunteer from the comfort of your home you've chosen the right way to volunteer! You can make meals including soups, salads, pizza, cookies, pastries etc... of your choice! Every meal you make will be enjoyed by the unhoused of our city. It's practicing your cooking skills in the safety of your home, appreciated by hundreds and most importantly, helping our unhoused neighbors eat. Let's get cooking :)
                                </p>
                            </Col>
                            <Col className={"py-3 px-4 fs-4"} sm={12} lg={6} fluid>
                                <Container className={"px-0"} fluid>
                                    <h2 className={"fw-light text-lg-start"}><span className={"border-decor"}>Please Note:</span></h2>
                                    <h2 className={"fs-4 fw-light "}>
                                        Eligible Areas in Montreal (where your home / kitchen is located):
                                        Cooks that&nbsp;
                                        <span className={"fw-normal text-info"}>
                                                          don't live
                                                     </span>
                                        &nbsp;in these areas and still want to cook will need to drop off food at&nbsp;
                                        <span className={"fw-normal text-info"}>
                                                         1500 Rue Berri, Montréal, QC H2L 2C4
                                                     </span>
                                        &nbsp;for&nbsp;
                                        <span className={"fw-normal text-info"}>
                                                         12:00pm.
                                                     </span>
                                    </h2>
                                    <SeekedDonations />
                                </Container>
                                <Container className={"d-flex justify-content-center my-5"}>
                                    <Link onClick={handleLink} to={"/activity/volunteer/#startVolunteeringId"} className={"btn btn-outline-info"}>
                                        Sign up as a cook volunteer right now!
                                    </Link>
                                </Container>
                            </Col>
                            <Col className={"py-3 px-4"} sm={12} lg={6} fluid>
                                <Container className={"px-0"} fluid>
                                    <h2 className={"fw-light text-lg-end"}><span className={"border-decor"}>Cook Volunteer Responsibilities:</span></h2>
                                    <ol className={"lead fs-4 "} style={{"textAlign": "justify"}}>
                                        <li className={"py-2"}>Prepare food in a sanitary environment</li>
                                        <li className={"py-2"}>Ensure that food items are appropriately labelled to accommodate individuals with allergies or specific diet concerns</li>
                                        <li className={"py-2"}>Communicate with Welfare Avenue staff to coordinate drop-off/ pick-up</li>
                                        <li className={"py-2"}><span className={"fw-normal text-info"}>Make sure</span> quantity of prepared meal is enough to feed approximately 25-40 people or 2 long aluminum trays.</li>
                                        <li className={"py-2"}><span className={"fw-normal text-info"}>Important</span>: &nbsp;Welfare Avenue does not supply food for volunteer cooks on your first time. You must sign up for an additional 2 dates; consecutively or not in order to have ingredients and containers delivered to your door.</li>
                                        <li className={"py-2"}><span className={"fw-normal text-info"}>Packaging</span>: &nbsp;Depending on food item; for instance, sandwiches must be wrapped individually, and larger items such as rice or pasta can be stored in an aluminum container.</li>
                                    </ol>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Tab>
            <Tab eventKey="serverVolunteer" title="Server Volunteer" style={{"--bs-nav-tabs-link-active-bg": 'none'}}>
                <Container className={"px-0 px-lg-3"} fluid>
                    <Container>
                        <h1 className={" text-center py-3 mt-1"}>Volunteer as a server</h1>
                    </Container>
                    <Container className={"px-0"} fluid>
                        <Row className={"d-flex flex-row"}>
                            <Col  sm={12} lg={6} className={"py-5 px-0"}>
                                <Container className={"d-flex justify-content-center"}>
                                    <img height={500} className={"img-fluid shadow-lg"} src={volunteerServer} alt="Server Image"/>
                                </Container>
                            </Col>
                            <Col className={"p-3"} sm={12} lg={6} fluid>
                                    <h2 className={"fw-light text-lg-end"}><span className={"border-decor"}>Service Description:</span> </h2>
                                <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>
                                    As a server volunteer, you will help give out food and clothes face-to-face with the unhoused of Montreal. This heartwarming experience is unlike any!
                                </p>
                                <h2 className={"fw-light text-lg-end"}><span className={"border-decor"}>Volunteer Responsibilities:</span> </h2>
                                <ol className={"lead fs-4 "} style={{"textAlign": "justify"}}>
                                    <li className={"py-2"}>Help with loading and unloading from driver volunteer's car</li>
                                    <li className={"py-2"}>Set up tables, tents, and create a system of giving out the food, hygiene product and clothing.</li>
                                    <li className={"py-2"}>Distribute food items and/or utensils to population being serviced</li>
                                    <li className={"py-2"}>Have conversations with those your helping and of course your peer volunteers while listening to music</li>
                                    <li className={"py-2"}>Help take down everything once all is given out</li>
                                </ol>
                                <Container className={"d-flex justify-content-center my-5"}>
                                    <Link onClick={handleLink} to={"/activity/volunteer/#startVolunteeringId"} className={"btn btn-outline-info"}>
                                        Sign up as a volunteer right now!
                                    </Link>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Tab>
        </Tabs>
    )
}

function SeekedDonations(){
    const locationItems = ["All Downtown Montreal Districts", "Parc Extension", "TMR (Town of Mont Royal)", "Griffintown", "Le Plateau", "Mont-Royal", "Mile End", "Villeray", "Outremont", "Cote Des Neiges", "Westmount", "The village", "Laurier", "Little Italy", "Saint Henri"];
    return (
        <Accordion defaultActiveKey={"0"}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Locations</Accordion.Header>
                <Accordion.Body>
                    <DoubleColumn items={locationItems} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
