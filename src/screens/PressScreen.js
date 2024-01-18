import React from "react";
import {Container, Col, Row} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function PressScreen(){

    return (
        <>
            <MyNavbar />
            <Container className={"p-lg-4 mx-0"} fluid>
                <Container className={"py-4 pb-5  px-0"} fluid>
                    <h1 className={"text-center m-0"}>Press Coverage</h1>
                </Container>
                <Container className={"p-lg-4"} fluid>
                    <Row className={`d-flex flex-row px-0 mx-0 .news-box-container my-3`} >
                        <Col sm={12} lg={6}
                             className={"d-flex justify-content-center align-content-center p-0"}>
                            <iframe className={"w-75 shadow-lg"}
                                    src="https://youtube.com/embed/XXnRy4axqKY?autoplay=1&mute=1&loop=1&rel=0"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                            </iframe>
                        </Col>
                        <Col sm={12} lg={6}
                             className={"d-flex justify-content-center p-4"}>
                            <p className={"fs-4 lead p-lg-3"}>
                                In this interview with Welfare Avenue, Pamela Pagano really dives into Welfare Avenue’s weekly volunteering events highlighting the nutritious food we prepare, the strong student involvement as well as the positive and kind community that is growing ever so quickly.
                            </p>
                        </Col>
                    </Row>
                    <Row className={`d-flex flex-row px-0 mx-0 flex-sm-row-reverse .news-box-container my-3`} >
                        <Col sm={12} lg={6} className={"d-flex justify-content-center align-content-center p-0"}>
                            <iframe className={"w-75 shadow-lg"}
                                    src="https://www.youtube.com/embed/5C7RoUmCMSI?autoplay=0&mute=1&loop=1&rel=0"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                            </iframe>
                        </Col>
                        <Col sm={12} lg={6} className={"d-flex flex-column justify-content-center align-content-center  p-4"}>
                            <p className={"fs-4 lead p-lg-3"}>
                                In our CBC interview conducted by Chloe Ranaldi, <span className={"text-info"}>Steel MacDonald</span>, our founder speaks a bit more into detail on how the organization started and what our weekly volunteering process looks like. We also have one of our most committed volunteer Melissa Keza speak about her experience volunteering with us.
                            </p>
                        </Col>
                    </Row>
                    <Row className={`d-flex flex-row px-0 mx-0 .news-box-container my-3`} >
                        <Col sm={12} lg={6} className={"d-flex justify-content-center align-content-center p-0 b-1"}>
                            <iframe className={"w-75 shadow-lg"}
                                    src="https://www.youtube.com/embed//Vf-2SEKQEuM?autoplay=0&mute=1&loop=1&rel=0"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                            </iframe>
                        </Col>
                        <Col sm={12} lg={6} className={"d-flex flex-column justify-content-center align-content-center p-4"}>
                            <p className={"fs-4 lead p-lg-3"}>
                                In our latest news coverage by CTV News, Luca Caruso had found us by coincidence during our weekly serving at Park Emilie Gamelin. In this small segment, it highlights that we are outside on the ground helping those in need all year round despite the weather. Our co-executive director Shanada Kurbanali also speaks about the necessities of our beneficiaries during the colder months.
                            </p>
                            <a href={"https://www.cbc.ca/news/canada/montreal/montreal-homeless-welfare-avenue-1.6470047"}
                                  className={"btn btn-outline-info"} target={"_blank"}>
                                <span>Read More CBC </span>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>

    )
}
