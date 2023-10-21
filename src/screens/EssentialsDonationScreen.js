import React from "react";
import {Container, Col, Row, Accordion} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import essentialsDonations from "../assets/images/activity/clothesDonation.png"
import DoubleColumn from "../components/DoubleColumn";

export default function EssentialsDonationScreen() {
    return (
        <>
            <MyNavbar />
            <Container fluid>
                <Container>
                    <h1 className={" text-center py-3 mt-1"}>Donate the Essentials!</h1>
                </Container>
                <Container>
                    <Row className={"d-flex flex-row flex-sm-row-reverse"}>
                        <Col  sm={12} lg={6} className={"py-5"}>
                            <Container className={"d-flex justify-content-center px-0"}>
                                <img height={500} className={"img-fluid shadow-lg"} src={essentialsDonations} alt="Essential Donations"/>
                            </Container>
                        </Col>
                        <Col className={"p-3"} sm={12} lg={6}>
                            <h2 className={" fw-light text-lg-start"}><span className={"border-decor"}>Description:</span> </h2>
                            <p className={"lead fs-4 my-3"} style={{"textAlign": "justify"}}>
                                Got any extra clothes that you aren't wearing? Or maybe some food that nobody is eating?
                                The idea is to donate items that people without homes might be missing and to bring them during our Sunday events at Berri UQAM for 12pm!

                            </p>
                            <Container className={"px-0 py-3"} fluid>
                                <h2 className={"fs-4 fw-light"}>
                                    What we need:
                                </h2>
                                <SeekedDonations />
                            </Container>
                            <p className={"lead fs-4 py-3"}><span className={"border-decor"}>Regulations:</span> <DoubleColumn items={["Clean or new clothes only", "Unopened items (e.g, brand new toothpaste)"]} /></p>
                            <p className={"lead"}>
                                If you would like to donate, please bring your donations to one of our weekly volunteering events!
                            </p>
                            {/*<Container className={"d-flex justify-content-center"}>*/}
                            {/*    <span className={"text-center btn btn-outline-info w-50"}>Book Now!</span>*/}
                            {/*</Container>*/}
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    )
}

function SeekedDonations() {
    const foodItems = ["Pasta", "Canned Anything", "Rice", "Chips", "Granola Bars", "Sauces", "Spices", "Oils", "Nuts", "Pastries", "Beans", "Water Bottles", "Crackers", "Lentils"];
    const hygieneItems = ["Sunscreen", "Toothpaste", "Deodorants", "Purel", "Pads", "Tampons"];
    const summerItems = ["Shoes", "Light socks", "T-shirts", "Sweaters", "Short", "Sunglasses", "Caps", "Sandals", "Bedding"];
    const winterItems = ["Boots", "Warm socks", "Jackets", "Scarfs", "Hats", "HotPads", "Sweatpants", "Gloves", "Bedding"];


    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Winter Clothing</Accordion.Header>
                <Accordion.Body>
                    <DoubleColumn items={winterItems} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Summer Clothing</Accordion.Header>
                <Accordion.Body>
                    <DoubleColumn items={summerItems} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Hygiene Products</Accordion.Header>
                <Accordion.Body>
                    <DoubleColumn items={hygieneItems} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Food</Accordion.Header>
                <Accordion.Body>
                    <DoubleColumn items={foodItems} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
