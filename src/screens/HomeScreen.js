import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import MyNavbar from "../components/Navbar";
import {UncontrolledCarousel} from "../components/UncontrolledCarousel";
import SimpleCloud from "../components/WordCloud";
import {EventTabs} from "../components/EventTabs";
import {OurFocus} from "../components/OurFocus";
import {Partners} from "../components/Partners";
import Footer from "../components/Footer";

import slide1 from "../assets/images/home/slide1.jpg";
import slide2 from "../assets/images/home/slide2.jpg";
import slide3 from "../assets/images/home/slide3.jpg";
import slide4 from "../assets/images/home/slide4.png";
import slide5 from "../assets/images/home/slide5.jpg";
import concordia from "../assets/images/home/parteners/concordia.svg";
import mcgill from "../assets/images/home/parteners/mcgill.svg";
import jAbbott from "../assets/images/home/parteners/jabbott.svg";
import ymca from "../assets/images/home/parteners/YMCA.svg";
import investQC from "../assets/images/home/parteners/investQC.svg";
import quote1 from "../assets/images/home/quotes/fransua.jpg";
import quote2 from "../assets/images/home/quotes/karina.jpeg";
import quote3 from "../assets/images/home/quotes/kassandra.jpeg";

const backgrounds = [
    {
        "img": slide1,
        "url": "../assets/images/slide1.jpg",
        "title": "Join Welfare Avenue",
        "text": "WelfareAvenue is on a mission to make life around us better."
    },
    {
        "img": slide2,
        "url": "../assets/images/slide2.jpg",
        "title": "Donate",
        "text": ""
    },
    {
        "img": slide3,
        "url": "../assets/images/slide3.jpg",
        "title": "Volunteer",
        "text": ""
    },
    {
        "img": slide4,
        "url": "../assets/images/slide4.png",
        "title": "Give Back",
        "text": ""
    },
    {
        "img": slide5,
        "url": "../assets/images/slide5.jpg",
        "title": "Share",
        "text": ""
    },
];
const partnersListDuplicated = [
    {
        "name": "Concordia Logo",
        "id": 0,
        "img": concordia,
        "url": "https://www.concordia.ca/"
    },
    {
        "name": "McGill Logo",
        "id": 1,
        "img": mcgill,
        "url": "https://www.mcgill.ca/"
    },
    {
        "name": "John Abbot College Logo",
        "id": 2,
        "img": jAbbott,
        "url": "https://www.johnabbott.qc.ca/"
    },
    {
        "name": "Investissement Quebec Logo",
        "id": 3,
        "img": investQC,
        "url": "https://www.investquebec.com/quebec/fr"
    },
    {
        "name": "YMCA Logo",
        "id": 4,
        "img": ymca,
        "url": "https://www.ymcaquebec.org/"
    },
    {
        "name": "Concordia Logo",
        "id": 5,
        "img": concordia,
        "url": "https://www.concordia.ca/"
    },
    {
        "name": "McGill Logo",
        "id": 6,
        "img": mcgill,
        "url": "https://www.mcgill.ca/"
    },
    {
        "name": "John Abbot College Logo",
        "id": 7,
        "img": jAbbott,
        "url": "https://www.johnabbott.qc.ca/"
    },
    {
        "name": "Investissement Quebec Logo",
        "id": 8,
        "img": investQC,
        "url": "https://www.investquebec.com/quebec/fr"
    },
    {
        "name": "YMCA Logo",
        "id": 9,
        "img": ymca,
        "url": "https://www.ymcaquebec.org/"
    }
]


async function fetchEvents() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/all`);
    return await response.json();
}

export function HomeScreen() {
    const handleLink = () => {
        window.scrollTo(0, 0);
    };

    const [allEvents, setEvents] = useState([]);

    useEffect(() => {
        (async() => {
            const data = await fetchEvents();
            setEvents(data);
        })()
    }, []);
    return (
        <>
            <MyNavbar />
                <UncontrolledCarousel backgrounds={backgrounds}/>
                <Container className={"start-0  px-0 position-relative "} fluid>
                        <h2 className="text-center text-light transitioning-background-primary py-2 mt-0 lead fs-1">
                            <FontAwesomeIcon icon={faHouse} /> Our Mission
                        </h2>
                    <p className="px-1 lead py-1 fs-4 " style={{"textAlign": "justify", "margin": "0 5%"}}>
                        Welfare Avenue is a not-for-profit organization whose mission is to work towards the advancement and
                         <span className={"text-secondary fw-medium"}> inclusion of low-income and unhoused individuals</span> in the Greater Montreal Area, nationally,
                        and internationally, by relieving poverty and addressing <span className={"text-secondary fw-medium"}>food insecurity, isolation, and accessibility
                        to valuable resources.</span>
                    </p>
                    <p className="px-1 lead py-3 mb-5 fs-4 " style={{"textAlign": "justify", "margin": "0 5%"}}>
                        Our overarching theme is focused on leadership, partnership and networking to engage students, community members and other grassroot organizations in addressing our key issues.
                    </p>
                    <Container className={"pb-3 mb-5 d-flex align-content-center justify-content-center"}>
                        <Link onClick={handleLink} to={"/about"} className={"btn btn-lg btn-outline-info rounded"}>Read More About Us</Link>
                    </Container>
                </Container>
                <Container className={"px-0 w-100 "}
                           style={{border: ""}}
                           fluid>
                    <SimpleCloud />
                </Container>
                <Container className={"px-0 py-3 pt-0 my-0 transitioning-background-primary"} fluid>
                    <h2 className="text-center text-light transitioning-background-primary py-2 lead fs-1">
                        What We Do
                    </h2>
                    <Container className={"py-3"} >
                        <EventTabs events={allEvents} />
                    </Container>
                    <Container className={"py-0 my-0 d-flex align-content-center justify-content-center"}>
                        <Link onClick={handleLink} to={"/activity"} className={"btn btn-lg btn-outline-light rounded"}>Read More About Events</Link>
                    </Container>
                </Container>
                <Container className={"px-0 "} fluid>
                    <h2 className="text-center text-info py-2 lead fs-1">
                        Our Main Focus
                    </h2>
                    <OurFocus/>
                </Container>
                <Container className={"px-0"} fluid>
                    <h2 className="text-center text-light py-2 my-0 mt-4 lead fs-1 top-slope">
                        Our Partners
                    </h2>
                    <PartnerSection />
                    <Container className={"d-flex flex-row flex-wrap"} fluid>
                        <Col sm={12} md={6} className={"px-3"}>
                            <h2 className={"fs-2 lead text-center"}>Why we Partner</h2>
                            <Col sm={12} className={"p-lg-4 m-1"}>
                                <p className={"lead "} style={{"textAlign": "justify"}}>Welfare Avenue actively seeks partnerships with organizations that share our mission and goals in order to maximize our impact in addressing poverty, food instability, and limited accessibility to resources. By collaborating with like-minded organizations, we can combine our resources, networks, and expertise to create a more comprehensive and integrated approach to tackling these societal challenges. These partnerships allow us to leverage the strengths and capabilities of each organization, ultimately leading to a greater positive impact on the lives of low-income individuals and marginalized communities. Through our partnerships, we aim to foster collaboration, share best practices, and create sustainable solutions that address the root causes of poverty and social inequality.</p>
                            </Col>
                            {/*<Col sm={12} className={"p-lg-4 m-1"}>*/}
                            {/*    <p className={"lead "} style={{"textAlign": "justify"}}>2 {lorem}</p>*/}
                            {/*</Col>*/}
                        </Col>
                        <Col sm={12} md={6} className={"px-3"}>
                            <h2 className={"fs-2 lead text-center"}>What our Partnerships Create</h2>
                            <Col sm={12} className={"p-lg-4 m-1"}>
                                <p className={"lead "} style={{"textAlign": "justify"}}>Partnering with Welfare Avenue provides an opportunity for organizations to align themselves with a reputable and dedicated nonprofit organization committed to making a tangible difference in the lives of those in need. By partnering with us, organizations can demonstrate their corporate social responsibility and showcase their commitment to community engagement and social impact. Additionally, this can enhance your employee’s engagement, expand their reach, and create meaningful connections within the community. Through partnerships we provide organizations with the chance to collaborate on joint projects, leverage shared resources, and tap into our expertise in poverty alleviation and community development. By working together, partners can amplify their collective efforts and achieve greater outcomes in creating positive social change while helping us further our mission.</p>
                            </Col>
                            {/*<Col sm={12} className={"p-lg-4 m-1"}>*/}
                            {/*    <p className={"lead "} style={{"textAlign": "justify"}}>4 {lorem}</p>*/}
                            {/*</Col>*/}
                        </Col>
                    </Container>
                </Container>
            <Footer />
        </>
    )
}

function PartnerSection({}){
    return(
        <Container className={"px-0"} fluid>
            <div className={"top-slope text-light py-5"}>
                <Partners partners={partnersListDuplicated} />
                <Container>
                    <Row className={"d-flex flex-row flex-sm-row-reverse"}>
                        <Col  sm={12} lg={6} className={"py-5"}>
                            <Container className={"d-flex justify-content-center"}>
                                <img src={quote1} width={"100%"} className={"rounded-circle"}
                                     style={{WebkitFilter: "grayscale(100%)", "filter": "grayscale(100%)", maxHeight: "300px", maxWidth: "250px"}} alt={"François Bergeron"}/>
                            </Container>
                        </Col>
                        <Col className={"p-3 text-light"} sm={12} lg={6}>
                            <h2 className={"fw-light text-lg-start"}><span className={""}>François Bergeron </span> – Directeur général</h2>
                            <p className={"text-light fs-6"}>CDC Centre-Sud</p>
                            <Container className={"d-flex align-items-center"}>
                                <p className={"lead fs-4 my-3"}>
                                    "Cet organisme est actuellement un maillon essentiel dans la réponse collective alimentaire que les organismes communautaires construisent face à cette crise."
                                </p>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Slope1 />
            <div className={"bottom-slope text-light py-5"}>
                <Container>
                    <Row className={"d-flex flex-row"}>
                        <Col  sm={12} lg={6} className={"py-5"}>
                            <Container className={"d-flex justify-content-center"}>
                                <img src={quote2} width={"100%"} className={"rounded-circle"}
                                     style={{WebkitFilter: "grayscale(100%)", "filter": "grayscale(100%)", maxHeight: "300px", maxWidth: "250px"}}
                                     alt={"Karina Naim"}
                                />
                            </Container>
                        </Col>
                        <Col className={"p-3"} sm={12} lg={6}>
                            <h2 className={"fw-light text-lg-start"}><span className={""}>Karina Naim </span> – Directrice Générale</h2>
                            <p className={"text-light fs-6"}>SPORTIRA 1998</p>
                            <Container className={"d-flex align-items-center"}>
                                <p className={"lead fs-4 my-3"}>
                                    "Ce projet de cœur est maintenant devenu très grand et comme toute entreprise ou organisme qui croît rapidement, elle fait face à des défis et croissance. Les sans-abris les connaissent et comptent sur eux semaine après semaine. C’est maintenant à notre tour de les soutenir et de leur donner les outils nécessaires pour continuer leur excellent travail. Le potentiel de L’Avenue du Bien-Être est inarrêtable en raison du leadership de Steel et de son entourage. Sportira et moi personnellement allons être là à leurs côtés et on espère que leur travail continue pour aider non seulement nos sans abris mais pour amener un sens du devoir à nos jeunes."
                                </p>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Slope2 />
            <div className={"top-slope text-light py-5"}>
                <Container>
                    <Row className={"d-flex flex-row flex-sm-row-reverse"}>
                        <Col  sm={12} lg={6} className={"py-5"}>
                            <Container className={"d-flex justify-content-center"}>
                                <img src={quote3} width={"100%"} className={"rounded-circle"}
                                     style={{WebkitFilter: "grayscale(100%)", "filter": "grayscale(100%)", maxHeight: "300px", maxWidth: "250px"}}
                                     alt={"Kassandra Gervasi "}
                                />
                            </Container>
                        </Col>
                        <Col className={"p-3 text-light"} sm={12} lg={6}>
                            <h2 className={"fw-light text-lg-start"}><span className={""}>Kassandra Gervasi </span> –  Assistant Branch Manager</h2>
                            <p className={"text-light fs-6"}>RBC</p>
                            <Container className={"d-flex align-items-center"}>
                                <p className={"lead fs-4 my-3"}>
                                    "Being the community leader for the RBC Van Horne and Darlington branch means finding outstanding organizations who share RBC’s values and turning this common vision into a partnership.
                                    Welfare Avenue is certainly one of them, and having the chance to not only meet those who’ve dedicated their time to help Montréal’s unhoused population, but to actually see the importance in their work makes us realize how essential giving back truly is."
                                </p>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
            <SlopeOut />
        </Container>
    )
}
function Slope1() {
    return (
        <div className="slope-container">
            <svg viewBox="0 70 500 60" preserveAspectRatio="none">
                <rect x="0" y="0" width="500" height="500" style={{stroke: "none"}}/>
                <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                      style={{stroke: "none"}}></path>
            </svg>
        </div>
    )
}
function Slope2() {
    return (
        <div className="slope-container1">
            <svg viewBox="0 70 500 60" preserveAspectRatio="none">
                <rect x="0" y="0" width="500" height="500" style={{stroke: "none"}}/>
                <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                      style={{stroke: "none"}}></path>
            </svg>
        </div>
    )
}
function SlopeOut() {
    return (
        <div className="slope-container-out">
            <svg viewBox="0 70 500 60" preserveAspectRatio="none">
                <rect x="0" y="0" width="500" height="500" style={{stroke: "none"}}/>
                <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                      style={{stroke: "none"}}></path>
            </svg>
        </div>
    )
}

