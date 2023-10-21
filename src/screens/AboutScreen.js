import React, {useEffect, useState} from "react";
import {Container, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {
    faHeart,
    faHouse,
    faGlasses,
    faCheckCircle,
    faCircleHalfStroke,
    faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import fontImage from "../assets/images/about/front.jpg"
import testimonial1 from "../assets/images/about/testimonials/1.webp"
import testimonial2 from "../assets/images/about/testimonials/2.webp"
import testimonial3 from "../assets/images/about/testimonials/3.webp"
import testimonial4 from "../assets/images/about/testimonials/4.webp"
import UserDisplay from "../components/UserDisplay";
import { handleLink } from "../utils/navigationUtils"
const testimonials = [
    {
        "img": testimonial1,
        "url": "../assets/images/about/testimonials/1.webp",
        "name": "Sewon,David",
        "position": "Volunteer Passenger",
        "testimony": "\"I had such an amazing experience with Welfare Avenue! In fact, it is such an outstanding opportunity to spread generosity and happiness towards the ones in need. I can safely say that I’m extremely proud to be part of this organization, and to be able to support others in such unprecedented times. I certainly had the best volunteering experience with Welfare Avenue, and I would totally recommend it!\""
    },
    {
        "img": testimonial2,
        "url": "../assets/images/about/testimonials/2.webp",
        "name": "Jabery, Ammar",
        "position": "Volunteer Driver",
        "testimony": "\"This pandemic has been really hard on my mental health as we were all stuck at home without a choice. Having nothing to do gave me a sensation that I was not doing sometime useful to do with my life. Volunteering for Welfare Avenue gave me my spirit back as I could finally do something to help during these uncertain times. You would be surprise as how little of an act such as serving plates or cooking can be so helpful for those in need in our community! I am so grateful that I discovered this organization that gave me more determination to help my community. I will certainly not stop doing this. I have met so many people from a multicultural background that inspired me to work harder to fight poverty for our homeless population in Montreal!\""
    },
    {
        "img": testimonial3,
        "url": "../assets/images/about/testimonials/3.webp",
        "name": "Batoul-Sadouk, Maryam",
        "position": "Volunteer Cook",
        "testimony": "\"I am happy I contributed to this experience!\" "
    },
    {
        "img": testimonial4,
        "url": "../assets/images/about/testimonials/4.webp",
        "name": "Martinez, Alejandra",
        "position": "Volunteer Cook",
        "testimony": "\"Being part of the Welfare Avenue’s project gives me a sense of accomplishment. I have learned how important is for those in need to be seen, to be acknowledged and to feel that we all are part of the same community.\""
    },
];

async function fetchStaffMembers() {
    const response = await fetch(`/api/users/staff-members`);
    return await response.json();
}
export function AboutScreen(){
    const [staffMembers, setStaffMembers] = useState([]);

    useEffect(() => {
        (async() => {
            const data = await fetchStaffMembers();
            setStaffMembers(data);
        })()
    }, []);
    return (
        <>
            <MyNavbar />
            <Container style={{
                "backgroundImage": `url(${fontImage})`,
                "backgroundPosition": "center",
                "backgroundRepeat": "no-repeat",
                "backgroundSize": "cover",
                "width": "100%",
                "height": "61vh",
            }}
            fluid>
                <Container className={"h-100 d-flex flex-column justify-content-end text-center"}>
                    <h1 className={"text-light"}>About Us</h1>
                    <Container className={"py-5"}>
                        <Link onClick={handleLink} to={"/about/gallery"} className={"btn btn-info"}>
                            View Our Gallery
                        </Link>
                    </Container>
                </Container>
            </Container>
            <Container className={"px-0"} fluid>
                <h2 className="text-center text-light transitioning-background-primary py-2 lead fs-1">
                    Who We Are
                </h2>
                <p className="px-1 lead  py-4 mb-5 fs-4" style={{"textAlign": "justify", "margin": "0 5%"}}>
                    Welfare Avenue is a community organization that is led by students from various fields of study and
                    academic institutions based both in Montreal and Ontario. Our team of staff and volunteers work
                    diligently with partnering organizations and community members at large to address the needs of the
                    population we serve and to <span className={"text-secondary fw-medium"}>work collaboratively to ensure a better future for all</span>.
                </p>
            </Container>
            <Container
                className={"d-flex flex-row flex-wrap justify-content-center"} fluid>
                <Col sm={9}
                    className={"mx-1"}>
                    <h2 className={"text-center text-light transitioning-background-secondary py-2 mt-4 rounded-3 border lead fs-2"} style={{borderColor: "white"}}>
                        <FontAwesomeIcon icon={faHouse}/> Our Mission
                    </h2>
                    <p className="px-2 lead  py-3 fs-4" style={{"textAlign": "justify"}}>
                        Welfare Avenue is a not-for-profit organization whose mission is to work towards the advancement and
                        <span className={"text-secondary fw-medium"}> inclusion of low-income and unhoused individuals</span> in the Greater Montreal Area, nationally,
                        and internationally. Welfare Avenue is a not-for-profit organization whose mission is to work towards the advancement and inclusion of low-income individuals in the Greater Montreal Area, nationally and internationally. This is accomplished by the following activities:
                    </p>
                    <Row className={"lead mb-5"}>
                        <Col lg={12}  sm={12}>
                            <ol>
                                <li className={"py-1"}>Addressing isolation by implementing activities such as sports, community pop-ups, and game events for individuals experiencing  social exclusion, and 4. Increasing accessibility to valuable resources for marginalized individuals by partnering with local organizations and community workers to provide access to mental health supports, employment opportunities, and subsidized housing.</li>
                                <li className={"py-1"}>Relieving poverty by providing clothing, essential products, and other basic amenities to individuals and families of low income and those experiencing homelessness. </li>
                                <li className={"py-1"}>Addressing food insecurity by working collaboratively with volunteers to operate a food distribution service that provides healthy meals to people experiencing poverty and homelessness</li>
                            </ol>
                        </Col>
                    </Row>
                </Col>
                <Col sm={9}
                    className={"mx-1"}>
                    <h2 className={"text-center text-light transitioning-background-secondary py-2 mt-4 rounded-3 border lead fs-2"} style={{borderColor: "white"}}>
                        <FontAwesomeIcon icon={faGlasses}/> Our Vision
                    </h2>
                    <p className="px-2 lead  py-3 mb-5 fs-4" style={{textAlign: "justify"}}>
                        A world without poverty. A world where all individuals have the necessities they require and the opportunities available to them. A world where community engagement is a central value starting at a young age.
                    </p>
                </Col>
                <Col sm={9}
                    className={"mx-1"}>
                    <h2 className={"text-center text-light transitioning-background-secondary py-2 mt-4 rounded-3 border lead fs-2"} style={{borderColor: "white"}}>
                        <FontAwesomeIcon icon={faHeart}/> Our Values
                    </h2>
                    <p className="px-2 lead  py-3 mb-5 fs-4" style={{"textAlign": "justify"}}>
                        We believe that caring is sharing and engage all members of the community and other students to
                        give back to their communities in fulfilling ways. This community of our beneficiaries,
                        volunteers, and staff is built on the principle of mutual benefit. As our volunteers dedicate
                        their time and efforts to support marginalized groups and provide necessary resources, they
                        also gain <span className={"text-secondary fw-medium"}>invaluable experiences and personal growth</span>. Through their involvement, volunteers
                        develop empathy, leadership skills, and a deeper understanding of the challenges faced by
                        marginalized communities.
                    </p>
                </Col>
            </Container>
            <h2 className="text-center text-light transitioning-background-primary py-2 mt-4 lead fs-2 ">
                Our Team
            </h2>
            <Container  fluid>
                <UserDisplay users={staffMembers} areVolunteers={false} />
            </Container>
            <h2 className="text-center text-light transitioning-background-primary py-2 mt-4 lead fs-2">
                Testimonials
            </h2>
            <Container  fluid>
                <Container
                    className={"d-flex flex-row flex-wrap my-5"}>
                    {/*later supposed to bring data from api*/}
                    {testimonials.map(testimony => (
                            <Col xxl={4} xl={4} lg={4} md={4} sm={6}
                                 className={"align-content-center justify-content-center text-center"}
                                 key={testimony?.url} >
                                <Container className={""}>
                                    <img src={testimony?.img} width={"100%"} className={"rounded-circle"}
                                         style={{
                                             WebkitFilter: "grayscale(100%)",
                                            filter: "grayscale(100%)"}} alt={"Testimonial"}/>
                                </Container>
                                <h4>{testimony?.name}</h4>
                                <p>{testimony?.position}</p>
                                <p>{testimony?.testimony}</p>
                            </Col>
                        )
                    )}
                </Container>
            </Container>
            <h2 className={"text-center text-light transitioning-background-primary py-2 mt-4 lead fs-2"}>Our Roadmap</h2>
            <Container className={"p-4 px-0"} fluid>
                <Container className={"px-sm-0 px-md-4"} fluid>
                    <p className={"fs-4 lead px-2  py-4"}
                       style={{textAlign: "justify"}}>
                        As soon as you complete your donation, your gift will start its journey.
                        First your money will be turned into food, and then sent to our cook community to put
                        together meals that'll then be distributed to our unhoused neighbours every Saturday and Sunday,
                        Welfare Avenue is ready to deliver the food you send. Because you can't go there and hand out the
                        food yourself, we do it for you. Please send food to save a life today and join the fight against hunger.
                    </p>
                </Container>
                <Container className={"d-flex flex-row justify-content-center align-content-center flex-wrap px-sm-0"} fluid>
                    <Col lg={4} md={4} sm={6}
                         className={"m-1 mx-sm-0 px-sm-0"}>
                        <Container className={"p-2 px-0 mx-0"} fluid>
                            <h3 className={"text-center "}>Phase 1</h3>
                            <ul className={" fs-5 fw-light"}
                                style={{listStyle: "none"}}
                            >
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCheckCircle}/> Serve 250 nutritious meals every weekend <span className={"text-secondary fw-medium"}>(Achieved)</span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCheckCircle}/> Grow our volunteer database to over 200 people <span className={"text-secondary fw-medium"}>(Achieved)</span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCheckCircle}/> Register as a Non Profit Origination on provincial level <span className={"text-secondary fw-medium"}>(Achieved)</span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Partner with 5 Montreal educational institutions <span className={"text-secondary fw-medium"}>(3/5) </span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Develop partnerships with 5 local businesses <span className={"text-secondary fw-medium"}>(2/5)</span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Raise funds through digital marketing & outreach for Phase 2 <span className={"text-secondary fw-medium"}>(in progress)</span></li>
                            </ul>
                        </Container>
                    </Col>
                    <Col lg={4} md={4} sm={6}
                         className={"m-1 mx-sm-0 px-sm-0"}>
                        <Container className={"p-2 px-0 mx-0"} fluid>
                            <h3 className={"text-center "}>Phase 2</h3>
                            <ul className={" fs-5 fw-light"}
                                style={{listStyle: "none"}}
                            >
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Register the organization as Charity on the federal level <span className={"text-secondary fw-medium"}>(in progress)</span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Give out charitable receipts</li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Purchase a van to transport goods <span className={"text-secondary fw-medium"}>(in progress)</span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Purchase or receive storage space in downtown Montreal <span className={"text-secondary fw-medium"}>(in progress)</span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Develop partnerships with 10 local businesses <span className={"text-secondary fw-medium"}>(2/10)</span></li>
                                <li><FontAwesomeIcon className={"text-secondary fw-medium"} icon={faCircleHalfStroke}/> Serve 500 nutritious meals on a weekly basis <span className={"text-secondary fw-medium"}>(in progress)</span></li>
                                <li><FontAwesomeIcon className={"text-info fw-medium"} icon={faArrowCircleRight}/> Grow our volunteer database to over 500 people</li>
                                <li><FontAwesomeIcon className={"text-info fw-medium"} icon={faArrowCircleRight}/> Provide sustainable jobs</li>
                            </ul>
                        </Container>
                    </Col>
                    <Col lg={3} md={4} sm={6}
                         className={"m-1 mx-sm-0 px-sm-0"}>
                        <Container className={"p-2 px-0 mx-0"} fluid>
                            <h3 className={"text-center "}>Phase 3</h3>
                            <ul className={" fs-5 fw-light"}
                                style={{listStyle: "none"}}
                            >
                                <li><FontAwesomeIcon className={"text-info fw-medium"} icon={faArrowCircleRight}/> Provide affordable housing</li>
                                <li><FontAwesomeIcon className={"text-info fw-medium"} icon={faArrowCircleRight}/> Expand operations to other Canadian cities (Vancouver, Toronto, etc)</li>
                                <li><FontAwesomeIcon className={"text-info fw-medium"} icon={faArrowCircleRight}/> Serve 200 nutritious meals on a DAILY basis</li>
                            </ul>
                        </Container>
                    </Col>
                </Container>
            </Container>
            <h2 className="text-center text-light transitioning-background-primary py-2 mt-4 lead fs-2">
                Join Us!
            </h2>
            <Container className={"d-flex flex-wrap flex-row my-4 p-2 px-sm-0"}>
                <Col className={"text-center align-content-between px-lg-4"}
                    md={6} sm={12}>
                    <Link onClick={handleLink} className={"btn btn-outline-info"} to={"/activity/volunteer"}>Sign up for Volunteering!</Link>
                    <p className="px-lg-2  py-4 lead " style={{textAlign: "justify"}}>
                        In turn, our beneficiaries benefit from the dedicated support of our volunteers. They receive the
                        necessary resources, opportunities, and guidance to help them overcome the barriers that prevent them
                        from living their lives to the fullest. The mutually beneficial nature of our community fosters
                        a <span className={"text-secondary fw-medium"}>sense of empowerment, belonging, and hope </span>
                        among all those involved.
                    </p>
                </Col>
                <Col className={"text-center align-content-between px-lg-4"}
                    md={6} sm={12}>
                    <Link onClick={handleLink} className={"btn btn-outline-info"} to={"/signup"}>Become a team member!</Link>
                    <p className="px-lg-2  py-4 lead " style={{textAlign: "justify"}}>
                        Together, we strive towards achieving our organization's vision of a world free from poverty, where
                        marginalized groups are supported and given the tools to thrive. Through our collective efforts, we
                        aim to create <span className={"text-secondary fw-medium"}>positive change</span> and build a
                        <span className={"text-secondary fw-medium"}> brighter future </span> for everyone involved.
                    </p>
                </Col>
            </Container>
            <Footer />
        </>
    )
}
